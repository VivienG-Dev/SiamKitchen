import { defineStore } from 'pinia'
import type { Dish, DishesResponse } from '~/types/featuredDishes'
import { dishesResponseSchema } from '~/types/featuredDishes'
import { useFormatImageUrl } from '~/composables/useFormatImageUrl'

export const useDishesStore = defineStore('dishes', {
    state: () => ({
        data: null as Dish[] | null,
        loading: false,
        error: null as string | null
    }),

    actions: {
        async fetchFeaturedDishes() {
            const config = useRuntimeConfig()
            const baseUrl = config.public.strapiUrl
            const { data, error } = await useFetch<DishesResponse>(`${baseUrl}/api/dishes?populate=*&filters[isFeatured][$eq]=true`, {
                key: 'dishes-data',
                server: true,
                lazy: false,
                transform: (response) => {
                    const parsed = dishesResponseSchema.parse(response)
                    if (parsed.data) {
                        parsed.data = parsed.data.map(dish => {
                            if (dish.dishImage) {
                                dish.dishImage = useFormatImageUrl(dish.dishImage, baseUrl)
                            }
                            return dish
                        })
                    }
                    return parsed
                }
            })

            if (error.value) {
                this.error = error.value.message
                console.error('Error loading dishes:', error.value)
            }

            this.data = data.value?.data ?? null
        }
    }
})