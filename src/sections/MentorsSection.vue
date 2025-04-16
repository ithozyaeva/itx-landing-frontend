<script setup lang="ts">
import { AlertCircle, Award, Briefcase, MessageSquare, Search } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'

function reloadPage() {
  window.location.reload()
}

interface Mentor {
  id: number
  username: string
  firstName: string
  lastName: string
  occupation: string
  experience: string
  profTags: { id: number, title: string }[]
  contacts: { id: number, type: number, link: string }[]
  services: { id: number, name: string, price: number }[]
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
    mentors.value = data.items
    filteredMentors.value = data.items

    // Собираем все уникальные теги
    const allTags = new Set<string>()
    data.items.forEach((mentor: Mentor) => {
      mentor.profTags.forEach((tag) => {
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
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="error && !mentors.length" class="text-center py-10">
      <div class="flex justify-center mb-4">
        <AlertCircle class="h-12 w-12 text-red-500" />
      </div>
      <p class="text-red-500 mb-2">
        {{ error }}
      </p>
      <button
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        @click="reloadPage"
      >
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
            v-model="searchQuery"
            type="text"
            placeholder="Поиск по имени, специализации или услугам..."
            class="pl-10 w-full px-4 py-2 border rounded"
          >
        </div>

        <div class="mt-6">
          <p class="text-sm font-medium text-gray-700 mb-3">
            Фильтр по специализации:
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="spec in specializations"
              :key="spec"
              class="cursor-pointer px-3 py-1 rounded-full text-sm"
              :class="
                selectedSpecialization === spec
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              "
              @click="handleSpecializationClick(spec)"
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

      <div
        v-else-if="filteredMentors.length === 0"
        class="text-center py-16 text-gray-500"
      >
        Менторы не найдены
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="mentor in filteredMentors"
          :key="mentor.id"
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ mentor.firstName }} {{ mentor.lastName }}
                </h3>
                <p class="text-gray-600 mt-1">
                  {{ mentor.occupation }}
                </p>
              </div>
            </div>

            <div class="mt-4">
              <div class="flex items-center text-sm text-gray-500">
                <Briefcase class="h-4 w-4 mr-2" />
                <span>{{ mentor.experience }}</span>
              </div>
            </div>

            <div class="mt-4">
              <h4 class="text-sm font-medium text-gray-900 mb-2">
                Специализации:
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in mentor.profTags"
                  :key="tag.id"
                  class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {{ tag.title }}
                </span>
              </div>
            </div>

            <div class="mt-4">
              <h4 class="text-sm font-medium text-gray-900 mb-2">
                Услуги:
              </h4>
              <ul class="space-y-2">
                <li
                  v-for="service in mentor.services"
                  :key="service.id"
                  class="flex justify-between items-center text-sm"
                >
                  <span>{{ service.name }}</span>
                  <span class="font-medium">{{ service.price }} ₽</span>
                </li>
              </ul>
            </div>

            <div class="mt-4">
              <h4 class="text-sm font-medium text-gray-900 mb-2">
                Контакты:
              </h4>
              <div class="flex gap-3">
                <a
                  v-for="contact in mentor.contacts"
                  :key="contact.id"
                  :href="contact.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                >
                  <MessageSquare v-if="contact.type === 1" class="h-5 w-5" />
                  <Award v-else-if="contact.type === 2" class="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
