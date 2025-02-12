import { defineStore } from 'pinia'
import type { Recipe } from '~/types/recipe'
import { recipeResponseSchema } from '~/types/recipe'
import { useFormatImageUrl } from '~/composables/useFormatImageUrl'

export const useRecipeStore = defineStore('recipeDetail', {
    state: () => ({
        recipe: null as Recipe | null,
        loading: false,
        error: null as string | null,
    }),

    actions: {
        async fetchRecipe(documentId: string) {
            this.loading = true
            try {
                const config = useRuntimeConfig()
                const baseUrl = config.public.strapiUrl
                const { data, error } = await useFetch(`${baseUrl}/api/recipes/${documentId}?populate=*`, {
                    key: 'recipe-data',
                    server: true,
                    lazy: false,
                    transform: (response) => {
                        const parsed = recipeResponseSchema.parse(response)
                        if (parsed.data && parsed.data.recipeImage) {
                            parsed.data.recipeImage = useFormatImageUrl(parsed.data.recipeImage, baseUrl)
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
                    console.error('Error loading recipe:', error.value)
                }

                this.recipe = data.value?.data ?? null
            } catch (err: any) {
                console.error('Error loading recipe:', err)
                this.error = err.message || 'Failed to load recipe'
            } finally {
                this.loading = false
            }
        },
    },
})