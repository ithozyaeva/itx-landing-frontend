<script setup lang="ts">
import { PriceCard, Typography } from 'itx-ui-kit'

interface Tariff {
  name: string
  description: string
  price: number
  oldPrice?: number
  features: string[]
  link: string
  isPopular?: boolean
}

const tariffs: Tariff[] = [
  {
    name: 'Бригадир',
    description: 'Для начинающих специалистов',
    price: 400,
    features: [
      'Доступ к основным материалам',
      'Участие в общих обсуждениях',
      'Еженедельные вебинары',
      'Базовая поддержка сообщества',
    ],
    link: 'https://boosty.to/jointime/purchase/3150816',
  },
  {
    name: 'ХОЗЯИН',
    description: 'Для активных IT-специалистов',
    price: 2000,
    isPopular: true,
    features: [
      'Все преимущества предыдущих тарифов',
      'Приоритетная техническая поддержка',
      'Возможность влиять на запись контента',
      'Возможность участия в таблице менторов',
    ],
    link: 'https://boosty.to/jointime/purchase/3150814',
  },
  {
    name: 'KING',
    description: 'Для лидеров и руководителей',
    price: 2000,
    oldPrice: 4000,
    features: [
      'Все преимущества предыдущих тарифов',
      'Реклама ресурсов',
      'Повышенная позиция в таблице менторов',
      'Лычка в таблице менторов',
      'Личная консультация по любой теме',
    ],
    link: 'https://boosty.to/jointime/purchase/967625',
  },
]
</script>

<template>
  <section
    id="tariffs"
    class="w-full pt-12 md:pt-24 lg:pt-32"
  >
    <div class="container px-6 md:px-10">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <div class="space-y-2">
          <Typography
            variant="h2"
            as="h2"
            class="text-accent"
          >
            Варианты подписки
          </Typography>
          <Typography
            variant="body-xl"
            as="p"
            class="max-w-[540px]"
          >
            Подписка оформляется и продлевается через платформу Boosty
          </Typography>
        </div>
      </div>
      <div class="grid pt-12 lg:grid-cols-3 gap-5">
        <PriceCard
          v-for="tariff in tariffs"
          :key="tariff.name"
          :name="tariff.name"
          :price="tariff.price"
          :old-price="tariff.oldPrice"
          :features="tariff.features"
          :link="tariff.link"
          :variant="tariff.isPopular ? 'highlighted' : 'default'"
        />
      </div>
    </div>
  </section>
</template>
