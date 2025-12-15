<script setup lang="ts">
import { Accordion, Typography } from 'itx-ui-kit'

interface Question {
  title: string
  answer: string
}

const questions: Question[] = [
  {
    title: 'Как присоединиться к сообществу?',
    answer: ' Для присоединения к сообществу IT-ХОЗЯЕВА необходимо выбрать подходящий тарифный план, заполнить форму регистрации и оплатить подписку. После этого вы получите доступ к закрытой платформе и всем материалам согласно выбранному плану.',
  },
  {
    title: 'Могу ли я сменить тарифный план?',
    answer: ' Да, вы можете изменить свой тарифный план в любое время. При переходе на более дорогой план доплата рассчитывается пропорционально оставшемуся времени подписки. При переходе на более дешевый план изменения вступят в силу со следующего периода оплаты.',
  },
  {
    title: 'Какие активности доступны в сообществе?',
    answer: ' В сообществе IT-ХОЗЯЕВА доступны различные активности: общение, регулярные оффлайн встречи, онлайн встречи технического книжного клуба, киберспортивные турниры, совместное обсуждение новых IT-трендов и обучение.',
  },
]
</script>

<template>
  <section
    id="FAQ"
    class="w-full py-12 md:py-24 lg:py-32"
  >
    <div class="container px-6 md:px-10 space-y-9">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <div class="flex flex-col gap-5">
          <Typography
            variant="h2"
            as="h2"
            class="text-accent"
          >
            Частые вопросы
          </Typography>
          <Typography
            variant="body-xl"
            as="p"
            class="max-w-[540px]"
          >
            Эксперты нашего сообщества, которые готовы поделиться экспертизой
          </Typography>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 items-start gap-5">
        <Accordion
          v-for="question in questions"
          :key="question.title"
          :title="question.title"
          :content="question.answer"
        />
      </div>
    </div>
  </section>
</template>
