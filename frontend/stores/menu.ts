import { defineStore } from 'pinia'
import type { DishCategory } from '~/types/menu'
import { useFormatImageUrl } from '~/composables/useFormatImageUrl'

export const useMenuStore = defineStore('menu', {
    state: () => ({
        categories: null as DishCategory[] | null,
        loading: false,
        error: null as string | null
    }),

    actions: {
        async fetchMenu() {
            this.loading = true
            try {
                const config = useRuntimeConfig()
                const baseUrl = config.public.strapiUrl
                const { data, error } = await useFetch<{ data: DishCategory[] }>(
                    `${baseUrl}/api/dish-categories?populate[dishes][populate][0]=dishImage&populate[dishes][populate][1]=dietary_tags`,
                    {
                        key: 'menu-data',
                        server: true,
                        lazy: false,
                        transform: (response) => {
                            if (!response || !response.data) {
                                return { data: [] }
                            }
                            return {
                                data: response.data.map(category => ({
                                    id: category.id,
                                    dishCategoryTitle: category.dishCategoryTitle,
                                    dishCategoryDescription: category.dishCategoryDescription,
                                    displayOrder: category.displayOrder,
                                    dishes: {
                                        data: Array.isArray(category.dishes)
                                            ? category.dishes.map(dish => {
                                                const imageUrl = dish.dishImage ? useFormatImageUrl(dish.dishImage, baseUrl) : null
                                                return {
                                                    id: dish.id,
                                                    dishTitle: dish.dishTitle,
                                                    dishPrice: dish.dishPrice,
                                                    dishDescription: dish.dishDescription,
                                                    dishImage: imageUrl,
                                                    dietaryTags: {
                                                        data: dish.dietary_tags?.map((tag: any) => ({
                                                            id: tag.id,
                                                            name: tag.dietaryTagTitle,
                                                            description: tag.dietaryTagDescription,
                                                            type: tag.type
                                                        })) || []
                                                    },
                                                    category: { data: category }
                                                }
                                            })
                                            : []
                                    }
                                }))
                            }
                        }
                    }
                )

                if (error.value) {
                    throw error.value
                }

                this.categories = data.value?.data ?? null
            } catch (err) {
                console.error('Error loading menu:', err)
                this.error = 'Failed to load menu'
            } finally {
                this.loading = false
            }
        }
    }
})