import { defineStore } from 'pinia'
import type { SiteData } from '~/types/global'
import { siteSchema } from '~/types/global'
import { useFormatImageUrl } from '~/composables/useFormatImageUrl'

export const useSiteStore = defineStore('site', {
    state: () => ({
        data: null as SiteData | null,
        loading: false,
        error: null as string | null
    }),

    getters: {
        heroImageUrl: (state) => state.data?.data.heroImage?.url || null,
        formattedOpeningHours: (state) => {
            return (state.data?.data.openingHours ?? []).map(hour => {
                if (hour.startingTime && hour.endingTime) {
                    return {
                        ...hour,
                        openingHoursDay: hour.openingHoursDay ?? '',
                        startingTime: hour.startingTime.slice(0, 5) + ' AM',
                        endingTime: hour.endingTime.slice(0, 5) + ' PM'
                    }
                } else {
                    return {
                        ...hour,
                        openingHoursDay: hour.openingHoursDay ?? '',
                        startingTime: 'Closed',
                        endingTime: ''
                    }
                }
            })
        },
        isOpen: (state) => {
            const now = new Date()
            const currentDay = now.toLocaleDateString('th-TH', { weekday: 'long' })
            const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

            const restaurantScheduleForToday = (state.data?.data.openingHours ?? []).find(hour => hour.openingHoursDay === currentDay)

            if (!restaurantScheduleForToday || restaurantScheduleForToday.startingTime === 'Closed') return false

            const todaysOpeningTime = restaurantScheduleForToday.startingTime?.split(' ')[0] ?? ''
            const todaysClosingTime = restaurantScheduleForToday.endingTime?.split(' ')[0] ?? ''

            return currentTime >= todaysOpeningTime && currentTime < todaysClosingTime
        }
    },

    actions: {
        async fetchSiteData() {
            const config = useRuntimeConfig()
            const baseUrl = config.public.strapiUrl
            const { data, error } = await useFetch<SiteData>(`${baseUrl}/api/global?populate=*`, {
                key: 'site-data',
                server: true,
                lazy: false,
                transform: (data) => {
                    const parsed = siteSchema.parse(data)
                    if (parsed.data && parsed.data.heroImage) {
                        parsed.data.heroImage = useFormatImageUrl(parsed.data.heroImage, baseUrl)
                    }
                    return parsed
                },
                getCachedData: (key) => {
                    const nuxtApp = useNuxtApp()
                    return nuxtApp.isHydrating
                        ? nuxtApp.payload.data[key]
                        : nuxtApp.static.data[key]
                }
            })

            if (error.value) {
                this.error = error.value.message
                console.error('Error loading site data:', error.value)
            }

            this.data = data.value
        }
    }
})