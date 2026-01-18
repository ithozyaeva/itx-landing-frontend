<script lang="ts" setup>
import { computed } from 'vue'
import StructuredData from '@/components/StructuredData.vue'
import { usePageMeta } from '@/composables/useMeta'
import CalendarSection from '@/sections/CalendarSection.vue'
import FAQSection from '@/sections/FAQSection.vue'
import MentorsSection from '@/sections/MentorsSection.vue'
import PromoteSection from '@/sections/PromoteSection.vue'
import TariffSection from '@/sections/TariffSection.vue'
import WhySection from '@/sections/WhySection.vue'

usePageMeta({
  title: 'IT-ХОЗЯЕВА - закрытое сообщество IT-специалистов',
  description: 'Закрытое сообщество IT-специалистов, в котором ценят опыт, юмор и профессионализм. Обсуждаем не только работу, помогаем с поиском работы и собесами, проводим регулярные встречи и тренинги. Присоединяйтесь к сообществу профессионалов!',
  keywords: 'IT сообщество, программисты, разработчики, IT специалисты, закрытое сообщество, менторство, карьера в IT, IT профессионалы, IT хозяева, сообщество разработчиков, IT сообщество России',
  url: 'https://ithozyaeva.ru',
  type: 'website',
})

const structuredData = computed(() => [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'IT-ХОЗЯЕВА',
    'description': 'Закрытое сообщество IT-специалистов, в котором ценят опыт, юмор и профессионализм',
    'url': 'https://ithozyaeva.ru',
    'logo': 'https://ithozyaeva.ru/favicon.svg',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'IT-ХОЗЯЕВА',
    'url': 'https://ithozyaeva.ru',
    'description': 'Закрытое сообщество IT-специалистов',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'IT Сообщество',
    'provider': {
      '@type': 'Organization',
      'name': 'IT-ХОЗЯЕВА',
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'Россия',
    },
    'description': 'Закрытое сообщество IT-специалистов с менторством, встречами, обсуждениями и помощью в карьере',
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'RUB',
      'price': '400',
      'description': 'Тарифы от 400₽ в месяц',
    },
  },
])
</script>

<template>
  <StructuredData :data="structuredData" />
  <PromoteSection />
  <WhySection />
  <MentorsSection />
  <CalendarSection />
  <TariffSection />
  <FAQSection />
</template>
