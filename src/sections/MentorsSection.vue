<script setup lang="ts">
import type { Mentor } from '@/components/ui/MentorsCard.vue'
import MentorCard from '@/components/ui/MentorsCard.vue'
import { AlertCircle, Search } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'

function reloadPage() {
  window.location.reload()
}

const mentors = ref<Mentor[]>([])
const filteredMentors = ref<Mentor[]>([])
const searchQuery = ref('')
const selectedSpecialization = ref<string | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const specializations = ref<string[]>([])

async function fetchMentors() {
  try {
    loading.value = true
    const response = await fetch(`/api/mentors`, {
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Не удалось загрузить данные о менторах')
    }

    const data = await response.json()
    mentors.value = data.items ?? []
    filteredMentors.value = data.items ?? []

    // Собираем все уникальные теги
    const allTags = new Set<string>()
    data.items?.forEach((mentor: Mentor) => {
      mentor.profTags?.forEach((tag) => {
        allTags.add(tag.title)
      })
    })

    if (allTags.size > 0) {
      specializations.value = Array.from(allTags)
    }
  }
  catch (err) {
    console.error('Ошибка при загрузке менторов:', err)
    error.value = 'Не удалось загрузить данные о менторах. Пожалуйста, попробуйте позже.'
  }
  finally {
    loading.value = false
  }
}

function handleSpecializationClick(spec: string) {
  if (selectedSpecialization.value === spec) {
    selectedSpecialization.value = null
  }
  else {
    selectedSpecialization.value = spec
  }
}

watch([searchQuery, selectedSpecialization, mentors], () => {
  let result = mentors.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      mentor =>
        `${mentor.firstName} ${mentor.lastName}`.toLowerCase().includes(query)
        || mentor.occupation.toLowerCase().includes(query)
        || mentor.profTags.some(tag => tag.title.toLowerCase().includes(query))
        || mentor.services.some(service => service.name.toLowerCase().includes(query)),
    )
  }

  if (selectedSpecialization.value) {
    result = result.filter(mentor =>
      mentor.profTags.some(
        tag => tag.title.toLowerCase() === selectedSpecialization.value?.toLowerCase(),
      ),
    )
  }

  filteredMentors.value = result
})

onMounted(() => {
  fetchMentors()
})
</script>

<template>
  <section id="mentors" class="w-full py-12 md:py-24 lg:py-32">
    <div class="container px-4 md:px-6">
      <div v-if="error && !mentors.length" class="text-center py-10">
        <div class="flex justify-center mb-4">
          <AlertCircle class="h-12 w-12 text-red-500" />
        </div>
        <p class="text-red-500 mb-2">
          {{ error }}
        </p>
        <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded" @click="reloadPage">
          Попробовать снова
        </button>
      </div>

      <div v-else>
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">
            Наши менторы
          </h2>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              v-model="searchQuery" type="text" placeholder="Поиск по имени, специализации или услугам..."
              class="pl-10 w-full px-4 py-2 border rounded"
            >
          </div>

          <div class="mt-6">
            <p class="text-sm font-medium text-gray-700 mb-3">
              Фильтр по специализации:
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="spec in specializations" :key="spec" class="cursor-pointer px-3 py-1 rounded-full text-sm"
                :class="selectedSpecialization === spec
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
                " @click="handleSpecializationClick(spec)"
              >
                {{ spec }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="loading" class="text-center py-16">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" />
          <p class="mt-4 text-gray-600">
            Загрузка менторов...
          </p>
        </div>

        <div v-else-if="filteredMentors.length === 0" class="text-center py-16 text-gray-500">
          Менторы не найдены
        </div>

        <masonry-wall
          v-else v-slot="{ item }" :items="filteredMentors" :gap="25" :min-columns="1"
          :max-columns="2"
        >
          <MentorCard :mentor="item" />
        </masonry-wall>
      </div>
    </div>
  </section>
</template>
