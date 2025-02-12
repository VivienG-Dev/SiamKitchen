import { defineStore } from 'pinia'
import type { RecipePageResponse, RecipePageData } from '~/types/recipesPage'
import { recipePageResponseSchema } from '~/types/recipesPage'
import { useFormatImageUrl } from '~/composables/useFormatImageUrl'

export const useRecipePageStore = defineStore('recipePage', {
    state: () => ({
        data: null as RecipePageData | null,
        loading: false,
        error: null as string | null
    }),

    getters: {
        recipePageImageUrl: (state) => state.data?.recipePageImage?.url || null
    },

    actions: {
        async fetchRecipePageData() {
            const config = useRuntimeConfig()
            const baseUrl = config.public.strapiUrl
            const apiUrl = `${baseUrl}/api/recipe-page?=*&populate[recipePageImage][populate]=*`

            const { data, error } = await useFetch<RecipePageResponse>(apiUrl, {
                key: 'recipe-page-data',
                server: true,
                lazy: false,
                transform: (response) => {
                    const parsed = recipePageResponseSchema.parse(response)
                    if (parsed.data && parsed.data.recipePageImage) {
                        parsed.data.recipePageImage = useFormatImageUrl(parsed.data.recipePageImage, baseUrl)
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
                console.error('Error loading recipe page data:', error.value)
            }

            this.data = data.value?.data ?? null
        }
    }
})