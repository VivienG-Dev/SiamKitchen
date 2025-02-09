import { defineStore } from 'pinia'
import type { Recipe, RecipesResponse } from '~/types/recipe'
import { recipesResponseSchema } from '~/types/recipe'
import { useFormatImageUrl } from '~/composables/useFormatImageUrl'

export const useRecipesStore = defineStore('recipes', {
    state: () => ({
        data: null as Recipe[] | null,
        loading: false,
        error: null as string | null
    }),

    actions: {
        async fetchRecipes() {
            this.loading = true
            try {
                const config = useRuntimeConfig()
                const baseUrl = config.public.strapiUrl
                const { data, error } = await useFetch<RecipesResponse>(`${baseUrl}/api/recipes?populate=*`, {
                    key: 'recipes-data',
                    server: true,
                    lazy: false,
                    transform: (response) => {
                        const parsed = recipesResponseSchema.parse(response)
                        if (parsed.data) {
                            parsed.data = parsed.data.map(recipe => {
                                if (recipe.recipeImage) {
                                    // Replace the entire recipeImage object with the formatted version instead of creating an imageUrl object
                                    recipe.recipeImage = useFormatImageUrl(recipe.recipeImage, baseUrl)
                                }
                                return recipe
                            })
                        }
                        return parsed
                    }
                })

                if (error.value) {
                    this.error = error.value.message
                    console.error('Error loading recipes:', error.value)
                }

                this.data = data.value?.data ?? null
            } catch (err) {
                console.error('Error loading recipes:', err)
                this.error = 'Failed to load recipes'
            } finally {
                this.loading = false
            }
        }
    }
})