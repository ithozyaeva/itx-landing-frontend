<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>
