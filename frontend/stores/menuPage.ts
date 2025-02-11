import { defineStore } from 'pinia'
import type { MenuPageResponse, MenuPageData } from '~/types/menuPage'
import { menuPageResponseSchema } from '~/types/menuPage'
import { useFormatImageUrl } from '~/composables/useFormatImageUrl'

export const useMenuPageStore = defineStore('menuPage', {
    state: () => ({
        data: null as MenuPageData | null,
        loading: false,
        error: null as string | null
    }),

    getters: {
        menuPageImageUrl: (state) => state.data?.menuPageImage?.[0]?.url || null
    },

    actions: {
        async fetchMenuPageData() {
            const config = useRuntimeConfig()
            const baseUrl = config.public.strapiUrl
            const apiUrl = `${baseUrl}/api/menu-page?=*&populate[menuPageImage][populate]=*`

            const { data, error } = await useFetch<MenuPageResponse>(apiUrl, {
                key: 'menu-page-data',
                server: true,
                lazy: false,
                transform: (response) => {
                    const parsed = menuPageResponseSchema.parse(response)
                    if (parsed.data && parsed.data.menuPageImage) {
                        parsed.data.menuPageImage = parsed.data.menuPageImage.map(image => useFormatImageUrl(image, baseUrl))
                    }
                    return parsed
                }
            })

            if (error.value) {
                this.error = error.value.message
                console.error('Error loading menu page data:', error.value)
            }

            this.data = data.value?.data ?? null
        }
    }
})