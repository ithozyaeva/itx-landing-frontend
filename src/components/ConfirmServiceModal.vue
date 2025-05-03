<script setup lang="ts">
import { useConfirmedPrivacy } from '@/composables/useUser'
import { authService } from '@/services/auth'
import { X } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const isConfirmedPrivacy = useConfirmedPrivacy()

function handleConfirmed() {
  isConfirmedPrivacy.value = true
  emit('close')
  window.open(authService.getBotUrl(), '_blank')
}

function handleClose() {
  emit('close')
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    handleClose()
  }
}
</script>

<template>
  <Transition name="modal-fade">
    <div
      v-if="isOpen"
      class="fixed h-screen inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm"
      @click="handleBackdropClick"
    >
      <Transition name="modal-scale">
        <div v-if="isOpen" class="bg-white rounded-lg p-6 w-full max-w-md relative shadow-xl">
          <button
            class="absolute right-4 top-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            @click="handleClose"
          >
            <X class="h-4 w-4" />
          </button>

          <h2 class="text-xl font-bold mb-4">
            Согласие на обработку персональных данных
          </h2>

          <div class="mb-4">
            <p className="text-sm">
              Нажимая на кнопку "Принять", Вы соглашаетесь с
              <a href="/privacy" target="_blank" className="text-blue-600 underline">
                политикой конфиденциальности
              </a>
              и даёте согласие на обработку персональных данных согласно Федеральному закону №152-ФЗ.
            </p>
          </div>

          <div class="flex justify-end gap-3">
            <button
              class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-300 cursor-pointer"
              @click="handleClose"
            >
              Отменить
            </button>
            <button
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
              @click="handleConfirmed"
            >
              Принять
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
/* Анимация фона */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Анимация самого окна */
.modal-scale-enter-active {
  transition: all 0.3s ease-out;
}

.modal-scale-leave-active {
  transition: all 0.2s ease-in;
}

.modal-scale-enter-from,
.modal-scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

.modal-scale-enter-to,
.modal-scale-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>
