<script setup lang="ts">
import type { TelegramUser } from '@/services/auth'
import Logo from '@/assets/it-x-logo.svg'
import { useToken } from '@/composables/useToken'
import { useUser } from '@/composables/useUser'
import Navigation from '../sections/Navigation.vue'
import TelegramAuth from './TelegramAuth.vue'

const tgUser = useUser()
const tgToken = useToken()

function setUser(user: TelegramUser, token: string) {
  tgUser.value = user
  tgToken.value = token
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container flex h-16 items-center justify-between md:justify-between">
      <div class="flex items-center gap-2 font-bold text-xl">
        <img :src="Logo" class="w-20">
      </div>
      <Navigation />
      <div class="flex justify-end">
        <TelegramAuth v-if="!tgUser" bot-name="itx_welcome_bot" @auth="setUser" />
        <a
          v-else
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" href="/platform" rel="noopener noreferrer"
        >
          Перейти в платформу
        </a>
      </div>
    </div>
  </header>
</template>
