<script setup lang="ts">
import { computed } from 'vue';

interface DietaryTag {
    id: number;
    name: string;
    description: string;
    type: string;
}

interface Props {
    title: string;
    price: number;
    description: string;
    imageUrl: string;
    loading?: boolean;
    dietary?: string[];
    dietaryIcons?: Readonly<Array<{
        icon: any;
        label: string;
        color: string;
        textColor: string;
    }>>;
    dish: {
        title: string;
        dietaryTags: {
            data: DietaryTag[];
        };
    };
}

const props = withDefaults(defineProps<Props>(), {
    loading: false,
    dietary: () => [],
    dietaryIcons: () => []
});

const activeIcons = computed(() =>
    props.dietaryIcons?.filter(icon => props.dietary?.includes(icon.label)) ?? []
);
</script>

<template>
    <div
        class="flex flex-row bg-white shadow-sm hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-102 hover:bg-gradient-to-r hover:from-white hover:to-primary-light/10 group">
        <template v-if="loading">
            <div class="animate-pulse flex flex-row w-full gap-4">
                <div class="rounded-xl w-1/3 bg-gray-200" /> <!-- Image skeleton -->
                <div class="flex flex-col flex-1 gap-2 p-4">
                    <div class="flex justify-between items-center">
                        <div class="h-8 bg-gray-200 rounded w-1/2" /> <!-- Title skeleton -->
                        <div class="h-6 bg-gray-200 rounded w-16" /> <!-- Price skeleton -->
                    </div>
                    <div class="space-y-2">
                        <div class="h-4 bg-gray-200 rounded w-full" /> <!-- Description line 1 -->
                        <div class="h-4 bg-gray-200 rounded w-3/4" /> <!-- Description line 2 -->
                    </div>
                </div>
            </div>
        </template>

        <template v-else>
            <div class="relative w-1/3 h-32">
                <NuxtImg :src="imageUrl" :alt="title" class="rounded-l-xl w-full h-full object-cover" />
                <!-- Dietary Icons -->
                <div class="absolute top-2 right-2 flex flex-wrap gap-1 max-w-[90%]">
                    <div v-for="icon in activeIcons" :key="icon.label" class="group/icon relative">
                        <component :is="icon.icon" class="w-6 h-6 text-white p-1 rounded-full" :class="icon.color" />
                        <!-- Tooltip -->
                        <div class="absolute bottom-full right-0 mb-2 hidden group-hover/icon:block z-10">
                            <div class="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                {{ icon.label.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase()) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col flex-1 gap-2 p-2 rounded-xl">
                <div class="flex flex-row justify-between">
                    <h3 class="text-lg md:text-xl font-bold group-hover:text-primary transition-colors duration-300">
                        {{ title }}
                    </h3>
                    <span
                        class="text-lg text-primary font-medium group-hover:scale-110 transition-transform duration-300">
                        ${{ price }}
                    </span>
                </div>
                <div>
                    <p
                        class="text-sm md:text-md line-clamp-2 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        {{ description }}</p>
                </div>
            </div>
        </template>
    </div>
</template>