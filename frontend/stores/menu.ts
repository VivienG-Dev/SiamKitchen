import { defineStore } from 'pinia'
import type { DishCategory } from '~/types/menu'

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
                const { data, error } = await useFetch<{ data: DishCategory[] }>(
                    `${config.public.strapiUrl}/api/dish-categories?populate[dishes][populate][0]=dishImage&populate[dishes][populate][1]=dietary_tags`,
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
                                    dishes: {
                                        data: Array.isArray(category.dishes)
                                            ? category.dishes.map(dish => ({
                                                id: dish.id,
                                                dishTitle: dish.dishTitle,
                                                dishPrice: dish.dishPrice,
                                                dishDescription: dish.dishDescription,
                                                dishImage: dish.dishImage ? {
                                                    alternativeText: dish.dishImage.alternativeText,
                                                    url: `${config.public.strapiUrl}${dish.dishImage.url}`,
                                                    formats: {
                                                        ...dish.dishImage.formats,
                                                        small: dish.dishImage.formats.small
                                                            ? { ...dish.dishImage.formats.small, url: `${config.public.strapiUrl}${dish.dishImage.formats.small.url}` }
                                                            : null,
                                                        medium: dish.dishImage.formats.medium
                                                            ? { ...dish.dishImage.formats.medium, url: `${config.public.strapiUrl}${dish.dishImage.formats.medium.url}` }
                                                            : null,
                                                        large: dish.dishImage.formats.large
                                                            ? { ...dish.dishImage.formats.large, url: `${config.public.strapiUrl}${dish.dishImage.formats.large.url}` }
                                                            : null,
                                                        thumbnail: dish.dishImage.formats.thumbnail
                                                            ? { ...dish.dishImage.formats.thumbnail, url: `${config.public.strapiUrl}${dish.dishImage.formats.thumbnail.url}` }
                                                            : null
                                                    }
                                                } : null,
                                                dietaryTags: {
                                                    data: dish.dietary_tags?.map((tag: any) => ({
                                                        id: tag.id,
                                                        name: tag.dietaryTagTitle,
                                                        description: tag.dietaryTagDescription,
                                                        type: tag.type
                                                    })) || []
                                                },
                                                category: { data: category }
                                            }))
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