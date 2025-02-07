import { defineStore } from 'pinia'
import type { Dish, DishesResponse } from '~/types/dishes'
import { dishesResponseSchema } from '~/types/dishes'

export const useDishesStore = defineStore('dishes', {
    state: () => ({
        data: null as Dish[] | null,
        loading: false,
        error: null as string | null
    }),

    getters: {
        featuredDishes: (state) => state.data?.filter(dish => dish.isFeatured).map(dish => {
            const baseUrl = useRuntimeConfig().public.strapiUrl
            const image = dish.dishImage

            return {
                title: dish.dishTitle,
                price: dish.dishPrice,
                description: dish.dishDescription,
                imageUrl: {
                    url: `${baseUrl}${image.url}`,
                    formats: {
                        large: image.formats.large ? { url: `${baseUrl}${image.formats.large.url}` } : null,
                        medium: image.formats.medium ? { url: `${baseUrl}${image.formats.medium.url}` } : null,
                        small: image.formats.small ? { url: `${baseUrl}${image.formats.small.url}` } : null,
                        thumbnail: image.formats.thumbnail ? { url: `${baseUrl}${image.formats.thumbnail.url}` } : null
                    }
                }
            }
        }) ?? []
    },

    actions: {
        async fetchDishes() {
            const config = useRuntimeConfig()
            const { data, error } = await useFetch<DishesResponse>(`${config.public.strapiUrl}/api/dishes?populate=*`, {
                key: 'dishes-data',
                server: true,
                lazy: false,
                transform: (response) => dishesResponseSchema.parse(response)
            })

            if (error.value) {
                this.error = error.value.message
                console.error('Error loading dishes:', error.value)
            }

            this.data = data.value?.data ?? null
        }
    }
})