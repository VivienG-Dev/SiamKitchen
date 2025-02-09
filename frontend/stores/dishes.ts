import { defineStore } from 'pinia'
import type { Dish, DishesResponse } from '~/types/dishes'
import { dishesResponseSchema } from '~/types/dishes'
import { useFormatImageUrl } from '~/composables/useFormatImageUrl'

export const useDishesStore = defineStore('dishes', {
    state: () => ({
        data: null as Dish[] | null,
        loading: false,
        error: null as string | null
    }),

    getters: {
        featuredDishes: (state) => state.data?.filter(dish => dish.isFeatured).map(dish => {
            const image = dish.dishImage
            const imageUrl = useFormatImageUrl(image)
            return {
                title: dish.dishTitle,
                price: dish.dishPrice,
                description: dish.dishDescription,
                imageUrl
            }
        }) ?? []
    },

    actions: {
        async fetchDishes() {
            const config = useRuntimeConfig()
            const { data, error } = await useFetch<DishesResponse>(`${config.public.strapiUrl}/api/dishes?populate=*&filters[isFeatured][$eq]=true`, {
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