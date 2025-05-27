import type { TelegramUser } from './auth'
import axios from 'axios'

export interface CommunityEvent {
  id: number
  title: string
  description: string
  date: string
  placeType: PlaceType
  place: string
  customPlaceType: string
  eventType: string
  open: boolean
  hosts: TelegramUser[]
}

export type PlaceType = 'ONLINE' | 'OFFLINE' | 'HYBRID'

export const PlaceTypeRu: Record<PlaceType, string> = {
  ONLINE: 'Онлайн',
  OFFLINE: 'Оффлайн',
  HYBRID: 'Гибрид',
}
export const eventService = {
  getOld: async () => {
    const response: { items: CommunityEvent[], total: number } = (await axios.get('/api/events/old')).data
    return response.items
  },
  getNext: async () => {
    const reponse: { items: CommunityEvent[], total: number } = (await axios.get('/api/events/next')).data
    return reponse.items
  },
}
