<script setup lang="ts">
import { MenuItem } from 'itx-ui-kit'

const menuItems = ['менторы', 'встречи', 'тарифы', 'вопросы']
</script>

<template>
  <nav class="hidden md:flex gap-6">
    <MenuItem v-for="item in menuItems" :key="item" variant="default" as="a" href="#mentors" class="capitalize border-4 border-transparent">
      {{ item }}
    </MenuItem>
    <!--    <a href="#why" class="text-sm font-medium hover:underline underline-offset-4">
      Преимущества
    </a>
    <a href="#mentors" class="text-sm font-medium hover:underline underline-offset-4">
      Менторы
    </a>
    <a href="#tariffs" class="text-sm font-medium hover:underline underline-offset-4">
      Тарифы
    </a>
    <a href="#reviews" class="text-sm font-medium hover:underline underline-offset-4">
      Отзывы
    </a>
    <a href="#FAQ" class="text-sm font-medium hover:underline underline-offset-4">
      FAQ
    </a> -->
  </nav>
</template>
