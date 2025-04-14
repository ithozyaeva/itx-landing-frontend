<script setup lang="ts">
import type { TelegramUser } from '../services/auth'
import { onMounted } from 'vue'
import { authService } from '../services/auth'

const emit = defineEmits<{
  (e: 'auth', user: TelegramUser, token: string): void
}>()

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')

  if (token) {
    authService
      .authenticate(token)
      .then(({ user, token: authToken }) => {
        authService.setAuthHeader(authToken)
        emit('auth', user, authToken)
        window.history.replaceState({}, document.title, window.location.pathname)
      })
      .catch((error) => {
        console.error('Authentication failed:', error)
      })
  }
})
</script>

<template>
  <div class="flex items-center">
    <a
      :href="authService.getBotUrl()" target="_blank"
      class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
    >
      Войти через Telegram
    </a>
  </div>
</template>

<style scoped>
#telegram-login {
  min-height: 40px;
}
</style>
