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
        heroImageUrl: (state) => state.data?.data.heroImage?.url || null
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