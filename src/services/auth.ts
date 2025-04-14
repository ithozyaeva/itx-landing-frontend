import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export interface TelegramUser {
  id: number
  telegram_id: number
  username: string
  first_name: string
  last_name: string
  created_at: string
  updated_at: string
}

export const authService = {
  async authenticate(token: string): Promise<{ user: TelegramUser, token: string }> {
    const response = await axios.post(`${API_URL}/api/auth/telegram`, { token })
    return response.data
  },

  setAuthHeader(telegramId: number) {
    axios.defaults.headers.common['X-Telegram-User-ID'] = telegramId
  },

  clearAuthHeader() {
    delete axios.defaults.headers.common['X-Telegram-User-ID']
  },

  getBotUrl(): string {
    return `https://t.me/itx_welcome_bot?start=from_site`
  },
}
