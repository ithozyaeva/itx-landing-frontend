<script setup lang="ts">
import Placeholder from '@/assets/placeholder.jpg'
import { defineProps, onMounted, onUnmounted, ref } from 'vue'

defineProps<{ username: string }>()

const imgRef = ref()
function handleLoad(event: Event) {
  if ((event.target as HTMLImageElement).naturalWidth <= 1) {
    imgRef.value.src = Placeholder
  }
}

onMounted(() => {
  if (imgRef.value) {
    imgRef.value.addEventListener('load', handleLoad)
  }
})

onUnmounted(() => {
  if (imgRef.value) {
    imgRef.value.removeEventListener('load', handleLoad)
  }
})
</script>

<template>
  <img ref="imgRef" :src="`https://t.me/i/userpic/160/${username}.jpg`" :alt="`Аватар ${username}`">
</template>
