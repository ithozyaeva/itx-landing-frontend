import type { TelegramUser } from '@/services/auth'
import type { RemovableRef } from '@vueuse/core'
import { useLocalStorage } from '@vueuse/core'

export function useUser(): RemovableRef<null | TelegramUser> {
  return useLocalStorage<TelegramUser>('tg_user', null, { serializer: { read: JSON.parse, write: JSON.stringify } })
}
