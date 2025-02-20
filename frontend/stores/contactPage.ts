import { defineStore } from 'pinia'
import type { ContactPageResponse, ContactPageData } from '~/types/contactPage'
import { contactPageResponseSchema } from '~/types/contactPage'
import { useFormatImageUrl } from '~/composables/useFormatImageUrl'

export const useContactPageStore = defineStore('contactPage', {
    state: () => ({
        data: null as ContactPageData | null,
        loading: false,
        error: null as string | null
    }),

    getters: {
        contactPageImageUrl: (state) => ({
            url: state.data?.contactPageImage?.url || null,
            formats: state.data?.contactPageImage?.formats || null
        })
    },

    actions: {
        async fetchContactPageData() {
            const config = useRuntimeConfig()
            const baseUrl = config.public.strapiUrl
            const apiUrl = `${baseUrl}/api/contact-page?=*&populate[contactPageImage][populate]=*&populate[seo][populate]=*`

            const { data, error } = await useFetch<ContactPageResponse>(apiUrl, {
                key: 'contact-page-data',
                server: true,
                lazy: false,
                transform: (response) => {
                    const parsed = contactPageResponseSchema.parse(response)
                    if (parsed.data && parsed.data.contactPageImage) {
                        parsed.data.contactPageImage = useFormatImageUrl(parsed.data.contactPageImage, baseUrl)
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
                console.error('Error loading contact page data:', error.value)
            }

            this.data = data.value?.data ?? null
        }
    }
})