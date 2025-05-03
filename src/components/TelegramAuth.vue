<script setup lang="ts">
import type { TelegramUser } from '@/services/auth'
import ConfirmServiceModal from '@/components/ConfirmServiceModal.vue'
import { useConfirmedPrivacy } from '@/composables/useUser'
import { authService } from '@/services/auth'
import { onMounted, ref } from 'vue'

const emit = defineEmits<{
  (e: 'auth', user: TelegramUser, token: string): void
}>()

const isConfirmedPrivacy = useConfirmedPrivacy()

const isModalOpen = ref<boolean>(false)

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

function handleClick() {
  if (isConfirmedPrivacy.value) {
    window.open(authService.getBotUrl(), '_blank')
  }
  else {
    isModalOpen.value = true
  }
}
</script>

<template>
  <div class="flex items-center">
    <a
      class="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      @click="handleClick"
    >
      Войти через Telegram
    </a>
  </div>
  <ConfirmServiceModal :is-open="isModalOpen" @close="isModalOpen = false" />
</template>

<style scoped>
#telegram-login {
  min-height: 40px;
}
</style>
