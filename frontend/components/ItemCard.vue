<script setup lang="ts">
interface ImageUrl {
    url: string
    formats: {
        large?: { url: string } | null
        medium?: { url: string } | null
        small?: { url: string } | null
        thumbnail?: { url: string } | null
    }
}

interface Props {
    title: string
    price?: number
    description: string
    imageUrl: ImageUrl
    loading?: boolean
    link?: string
}

const props = defineProps<Props>()

const cleanTitle = props.title.replace('| Siam Kitchen', '');
</script>

<template>
    <div
        class="flex-1 flex flex-col h-auto bg-white p-2 shadow-sm hover:shadow-lg rounded-xl transition-shadow duration-300 hover:shadow-primary/50">
        <template v-if="loading">
            <div class="animate-pulse">
                <div class="rounded-xl w-full h-48 bg-gray-200" /> <!-- Image skeleton -->
                <div class="flex flex-col gap-2 p-4">
                    <div class="flex justify-between items-center">
                        <div class="h-8 bg-gray-200 rounded w-1/2" /> <!-- Title skeleton -->
                        <div v-if="price" class="h-6 bg-gray-200 rounded w-16" /> <!-- Price skeleton -->
                    </div>
                    <div class="space-y-2">
                        <div class="h-4 bg-gray-200 rounded w-full" /> <!-- Description line 1 -->
                        <div class="h-4 bg-gray-200 rounded w-3/4" /> <!-- Description line 2 -->
                    </div>
                </div>
            </div>
        </template>

        <template v-else>
            <NuxtLink :to="link" :class="link ? 'cursor-pointer' : ''">
                <NuxtImg :src="imageUrl.formats?.medium?.url || imageUrl.url" :alt="title"
                    class="rounded-xl w-full h-48 object-cover" />
                <div class="flex flex-col gap-2 backdrop-blur-sm p-4 rounded-xl">
                    <div class="flex flex-row justify-between">
                        <h3 class="text-2xl font-bold">{{ cleanTitle }}</h3>
                        <span v-if="price" class="text-lg text-primary font-medium">
                            ${{ price }}
                        </span>
                    </div>
                    <div>
                        <p class="text-md">{{ description }}</p>
                    </div>
                </div>
            </NuxtLink>
        </template>
    </div>
</template>