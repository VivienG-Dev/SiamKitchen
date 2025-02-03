<script setup lang="ts">
const { documentId } = useRoute().params;
console.log(documentId);

interface Recipe {
    title: string;
    description: string;
    imageUrl: string;
}

const isLoading = ref(true);
const recipe = ref<Recipe>({} as Recipe);

onMounted(async () => {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const recipeData: Recipe = {
            title: 'Pad Thai',
            description: 'A popular Thai dish made with stir-fried noodles, vegetables, and a flavorful sauce.',
            imageUrl: '/pad-thai.jpg',
        };

        recipe.value = recipeData;
    } catch (error) {
        console.error('Error loading recipes:', error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <section class="text-black px-4 md:px-4 lg:px-4 xl:px-0">
        <Container class="flex flex-col justify-center h-full">
            <div
                class="flex-1 flex flex-col h-auto bg-white p-2 shadow-sm hover:shadow-lg rounded-xl transition-shadow duration-300 hover:shadow-blue-300/50 mx-auto w-full md:w-4xl">
                <template v-if="isLoading">
                    <div class="animate-pulse">
                        <div class="rounded-xl w-full h-48 bg-gray-200" /> <!-- Image skeleton -->
                        <div class="flex flex-col gap-2 p-4">
                            <div class="flex justify-between items-center">
                                <div class="h-8 bg-gray-200 rounded w-1/2" /> <!-- Title skeleton -->
                            </div>
                            <div class="space-y-2">
                                <div class="h-4 bg-gray-200 rounded w-full" /> <!-- Description line 1 -->
                                <div class="h-4 bg-gray-200 rounded w-full" /> <!-- Description line 2 -->
                                <div class="h-4 bg-gray-200 rounded w-3/4" /> <!-- Description line 3 -->
                            </div>
                        </div>
                    </div>
                </template>

                <template v-else>
                    <NuxtImg :src="recipe.imageUrl" :alt="recipe.title" class="rounded-xl w-full h-48 object-cover" />
                    <div class="flex flex-col gap-2 backdrop-blur-sm p-4 rounded-xl">
                        <div class="flex flex-row justify-between">
                            <h3 class="text-2xl font-bold">{{ recipe.title }}</h3>
                        </div>
                        <div>
                            <p class="text-md">{{ recipe.description }}</p>
                        </div>
                    </div>
                </template>
            </div>
        </Container>
    </section>
</template>