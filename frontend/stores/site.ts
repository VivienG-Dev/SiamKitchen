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

            const format12Hour = (time24: string) => {
                if (!time24 || time24 === 'Closed') return time24;

                const [hours24, minutes] = time24.slice(0, 5).split(':');
                const hours = parseInt(hours24) % 12 || 12;
                const ampm = parseInt(hours24) < 12 ? 'AM' : 'PM';
                return `${hours}:${minutes} ${ampm}`;
            };

            return (state.data?.data.openingHours ?? []).map(hour => {
                if (hour.startingTime && hour.endingTime) {
                    return {
                        ...hour,
                        openingHoursDay: hour.openingHoursDay ?? '',
                        startingTime: format12Hour(hour.startingTime),
                        endingTime: format12Hour(hour.endingTime)
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
            // Get current date/time and extract the day name (e.g., "Monday") in Bangkok timezone
            const now = new Date();
            const currentDay = now.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Bangkok' });

            // Find today's schedule from the opening hours array
            const restaurantScheduleForToday = (state.data?.data.openingHours ?? []).find(hour => hour.openingHoursDay === currentDay);

            if (!restaurantScheduleForToday || restaurantScheduleForToday.startingTime === 'Closed') {
                return false;
            }

            // Split opening and closing times into hours and minutes
            // Default to '0:0' if times are undefined
            const [openingHours, openingMinutes] = restaurantScheduleForToday.startingTime?.split(':') ?? ['0', '0'];
            const [closingHours, closingMinutes] = restaurantScheduleForToday.endingTime?.split(':') ?? ['0', '0'];

            // Get current time in Bangkok
            const currentBangkokTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));

            // Create Date objects for today's opening and closing times
            const todaysOpeningTime = new Date(currentBangkokTime);
            todaysOpeningTime.setHours(Number(openingHours), Number(openingMinutes), 0, 0);

            const todaysClosingTime = new Date(currentBangkokTime);
            todaysClosingTime.setHours(Number(closingHours), Number(closingMinutes), 0, 0);

            const isOpen = currentBangkokTime >= todaysOpeningTime && currentBangkokTime < todaysClosingTime;

            return isOpen;
        },
        businessLocation: (state) => {
            return `${state.data?.data.businessLocation.streetNumber} ${state.data?.data.businessLocation.street}, ${state.data?.data.businessLocation.postalCode} ${state.data?.data.businessLocation.city}`
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