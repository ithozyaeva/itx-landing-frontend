<script setup lang="ts">
import type { CommunityEvent } from '@/services/events'
import Card from '@/components/ui/Card.vue'
import TgImage from '@/components/ui/TgImage.vue'
import { eventService, PlaceTypeRu } from '@/services/events'
import { computed, onMounted, ref } from 'vue'

const neededEvents = ref<'new' | 'old'>('new')
const events = ref<Record<'new' | 'old', CommunityEvent[]>>({
  new: [],
  old: [],
})

const formatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

async function loadEvents() {
  events.value.old = await eventService.getOld()
  events.value.new = await eventService.getNext()

  if (events.value.new.length === 0) {
    neededEvents.value = 'old'
  }
}

const hasFutureEvents = computed(() => events.value.new.length > 0)
const isFuture = computed(() => neededEvents.value === 'new')

onMounted(loadEvents)
</script>

<template>
  <section v-if="events.new.length > 0 || events.old.length > 0" id="calendar" class="w-full py-12 md:py-18 lg:py-24" style="background-color: #1a73e8; color: white;">
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <div class="space-y-2">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
            Присоединяйся к нашим встречам
          </h2>
        </div>

        <div class="flex space-x-4 rounded-full cursor-pointer select-none w-fit" style="background-color: #155ac1;">
          <button
            v-if="hasFutureEvents"
            :class="{ 'bg-blue-800': isFuture, 'bg-transparent': !isFuture }"
            class="px-6 py-2 rounded-full transition-colors duration-200"
            @click="neededEvents = 'new'"
          >
            Будет
          </button>
          <button
            :class="{ 'bg-blue-800': !isFuture, 'bg-transparent': isFuture }"
            class="px-6 py-2 rounded-full transition-colors duration-200"
            @click="neededEvents = 'old'"
          >
            Было
          </button>
        </div>
      </div>

      <div class="grid gap-6 pt-12 lg:grid-cols-1 lg:gap-8">
        <Card v-for="event in events[neededEvents]" :key="event.title">
          <template #header>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex space-x-2 text-sm">
                  <span class="inline-block rounded-lg px-3 py-1 text-xs text-white" style="background-color: #1e8be9;">{{ PlaceTypeRu[event.placeType] }}</span>
                  <span class="inline-block rounded-lg px-3 py-1 text-xs text-white" style="background-color: #e91e63;">{{ event.eventType }}</span>
                  <span v-if="event.placeType !== 'ONLINE'" class="inline-block rounded-lg bg-blue-800 px-3 py-1 text-xs text-white">{{ event.customPlaceType }}</span>
                </div>
                <div class="text-sm">
                  {{ formatter.format(new Date(event.date)) }}
                </div>
              </div>
              <div class="text-xl font-semibold mt-2">
                {{ event.title }}
              </div>
              <p class="text-xs">
                {{ event.description }}
              </p>
            </div>
          </template>
          <template #content>
            <div class="space-y-4">
              <div v-for="host in event.hosts" :key="host.id" class="flex items-center mt-4 space-x-4">
                <TgImage
                  :username="host.tg"
                  class="rounded-full"
                  width="60"
                  height="60"
                />
                <div>
                  <div class="font-semibold">
                    {{ host.firstName }} {{ host.lastName }}
                  </div>
                  <div class="text-sm text-muted-foreground">
                    {{ host.tg }}
                  </div>
                </div>
              </div>
              <div v-if="event.open">
                <a v-if="event.placeType === 'ONLINE'" :href="event.place" class="inline-block text-sm">{{ event.place }}</a>
                <p v-else>
                  Место встречи: {{ event.place }}
                </p>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>
