<script setup lang="ts">
import { useMenuStore } from '~/stores/menu'
import { dietaryIcons } from '~/constants/dietary'

const menuStore = useMenuStore()
await menuStore.fetchMenu()

const itemsByCategory = computed(() =>
    menuStore.categories?.map(category => ({
        id: category.id,
        name: category.dishCategoryTitle,
        description: category.dishCategoryDescription,
        items: category.dishes.data,
        order: category.displayOrder
    })).sort((a, b) => a.order - b.order) ?? []
)
</script>

<template>
    <section class="text-black px-4 md:px-4 lg:px-4 xl:px-0">
        <Container class="flex flex-col">
            <template v-if="menuStore.loading">
                <div v-for="n in 3" :key="n" class="mb-12">
                    <div class="animate-pulse mb-4">
                        <div class="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <MenuItemCard v-for="i in 2" :key="i" :loading="true" title="" :price="0" description=""
                            imageUrl="" :dish="{ title: '', dietaryTags: { data: [] } }" />
                    </div>
                </div>
            </template>

            <template v-else>
                <div v-for="category in itemsByCategory" :key="category.id" class="mb-16 relative">
                    <div class="mb-8 relative">
                        <div class="flex items-center justify-between pb-4 border-b-2 border-blue-100">
                            <div>
                                <h3 class="text-3xl font-bold text-blue-900 mb-2">{{ category.name }}</h3>
                                <p class="text-gray-600 italic">{{ category.description }}</p>
                            </div>
                            <div class="hidden md:block text-blue-500 opacity-10 text-8xl font-bold">
                                {{ category.name[0] }}
                            </div>
                        </div>
                    </div>

                    <div v-if="category.items?.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MenuItemCard v-for="dish in category.items" :key="dish.id" :title="dish.dishTitle"
                            :price="dish.dishPrice" :description="dish.dishDescription"
                            :image-url="dish.dishImage?.formats?.large?.url || dish.dishImage?.formats?.small?.url || dish.dishImage?.url"
                            :dietary="dish.dietaryTags?.data?.map((tag: any) => tag.type) || []"
                            :dietary-icons="dietaryIcons" :dish="dish" />
                    </div>
                    <div v-else class="bg-gray-50 rounded-xl p-8 text-center text-gray-500 border border-gray-200">
                        <p class="text-lg">No items available in this category</p>
                        <p class="text-sm text-gray-400">Check back soon for updates!</p>
                    </div>
                </div>
            </template>
        </Container>
    </section>
</template>