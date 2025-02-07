import { defineStore } from 'pinia'
import type { SiteData } from '~/types/global'

export const useSiteStore = defineStore('site', {
    state: () => ({
        data: null as SiteData | null,
        loading: false,
        error: null as string | null
    }),

    getters: {
        heroImageUrl: (state) => state.data?.data.heroImage
            ? `${useRuntimeConfig().public.strapiUrl}${state.data.data.heroImage.url}`
            : null
    },

    actions: {
        async fetchSiteData() {
            const config = useRuntimeConfig()
            const { data, error } = await useFetch<SiteData>(`${config.public.strapiUrl}/api/global?populate=*`, {
                key: 'site-data',
                server: true,
                lazy: false,
                transform: (data) => ({
                    data: {
                        siteName: data.data.siteName,
                        siteDescription: data.data.siteDescription,
                        heroImage: data.data.heroImage
                    }
                }),
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