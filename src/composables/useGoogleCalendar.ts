import type { CommunityEvent } from '@/services/events'

export function useGoogleCalendar() {
  // convert date for the GC format YYYYMMDDTHHmmssZ
  const formatDateForGoogle = (date: Date): string => {
    return `${date
      .toISOString()
      .split('.')[0]
      .replace(/[-:]/g, '')}Z`
  }

  const buildGoogleCalendarUrl = (event: CommunityEvent, durationMinutes: number = 60): string => {
    const start = new Date(event.date)

    let end: Date

    if ('endDate' in event && event.endDate) {
      end = new Date(event.endDate as string)
    }
    else {
      end = new Date(start.getTime() + durationMinutes * 60 * 1000)
    }

    const startStr = formatDateForGoogle(start)
    const endStr = formatDateForGoogle(end)

    const url = new URL('https://calendar.google.com/calendar/render')
    url.searchParams.set('action', 'TEMPLATE')
    url.searchParams.set('text', event.title || '')
    url.searchParams.set('dates', `${startStr}/${endStr}`)
    url.searchParams.set('details', event.description || '')
    url.searchParams.set('location', `${event.videoLink} ${event.place}` || '')

    return url.toString()
  }

  const openInGoogleCalendar = (event: CommunityEvent, durationMinutes: number = 60) => {
    const link = buildGoogleCalendarUrl(event, durationMinutes)
    window.open(link, '_blank')
  }

  return {
    openInGoogleCalendar,
    buildGoogleCalendarUrl,
    formatDateForGoogle,
  }
}
