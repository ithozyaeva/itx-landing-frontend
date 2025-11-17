<script setup lang="ts">
import type { Component } from 'vue'
import {
  GradesIcon,
  GradesMobileIcon,
  MeetingsIcon,
  MeetingsMobileIcon,
  TopicsIcon,
  TopicsMobileIcon,
  VacanciesIcon,
  VacanciesMobileIcon,
} from '@/assets/icons'
import FeatureItem from '@/components/ui/FeatureItem.vue'
import { useWindowSize } from '@vueuse/core'

import { Typography } from 'itx-ui-kit'
import { computed } from 'vue'

interface Feature {
  title: string
  description: string
  icon: Component
}

const { width } = useWindowSize()

const isMobile = computed(() => width.value < 600)

const features: Feature[] = [
  {
    icon: isMobile.value ? TopicsMobileIcon : TopicsIcon,
    title: 'обсуждаем не только работу',
    description: 'Участники общаются на самые разные темы и стараются помочь, если у кого-то возник вопрос или проблема.',
  },
  {
    icon: isMobile.value ? GradesMobileIcon : GradesIcon,
    title: 'ждём участников с любым бэкграундом',
    description: 'В сообществе собраны специалисты разных грейдов и специальностей из отечественных бигтехов и зарубежных стартапов. ',
  },
  {
    icon: isMobile.value ? VacanciesMobileIcon : VacanciesIcon,
    title: 'Помогаем с поиском работы и собесами',
    description: 'Регулярно постим вакансии и рекомендуем рефералов в свои компании. Даём советы по резюме и прохождению собеседований.',
  },
  {
    icon: isMobile.value ? MeetingsMobileIcon : MeetingsIcon,
    title: 'проводим регулярные встречи и тренинги',
    description: 'Регулярные английские и книжные клубы, лекции, тренинги и закрытые встречи для VIP-участников.',
  },

]
</script>

<template>
  <section
    id="why"
    class="w-full pt-16 md:pt-24 lg:pt-32"
  >
    <div class="container px-6 md:px-10 flex flex-col gap-10">
      <div class="flex flex-col gap-5 text-center lg:flex-row lg:flex-auto lg:text-start justify-between">
        <Typography
          variant="h2"
          as="h2"
          class="text-accent basis-2/5"
        >
          чем занимаются IT-хозяева?
        </Typography>
        <Typography
          variant="body-xl"
          as="p"
          class="basis-1/2"
        >
          IT-X — это 250+ представителей IT разных направлений и грейдов. Мы помогаем друг другу с обучением, наймом, работой, делимся полезной инфой и просто общаемся на любые темы.
        </Typography>
      </div>
      <div class="mx-auto grid grid-cols-1  md:grid-cols-1 lg:grid-cols-2 gap-5 flex-auto">
        <FeatureItem
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
          :icon="feature.icon"
        />
      </div>
    </div>
  </section>
</template>
