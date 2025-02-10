<script setup lang="ts">
const { documentId } = useRoute().params;
const recipeStore = useRecipeStore()
await recipeStore.fetchRecipe(documentId as string)

import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

const markdownContent = computed(() => {
    return recipeStore.recipe?.recipeContent ? md.render(recipeStore.recipe.recipeContent) : '';
});
</script>

<template>
    <section class="text-black px-4 md:px-4 lg:px-4 xl:px-0">
        <Container class="flex flex-col justify-center h-full">
            <div class="flex-1 flex flex-col h-auto bg-white p-2 shadow-sm rounded-xl mx-auto w-full md:w-4xl">
                <template v-if="recipeStore.loading">
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
                    <NuxtImg :src="recipeStore.recipe?.recipeImage?.formats?.large?.url"
                        :alt="recipeStore.recipe?.recipeTitle" class="rounded-xl w-full h-48 md:h-96 object-cover" />
                    <div class="flex flex-col gap-2 backdrop-blur-sm p-4 rounded-xl">
                        <div class="flex flex-row justify-between">
                            <h3 class="text-2xl font-bold">{{ recipeStore.recipe?.recipeTitle }}</h3>
                        </div>
                        <div class="recipe-markdown">
                            <div v-html="markdownContent" class="text-md"></div>
                        </div>
                    </div>
                </template>
            </div>
        </Container>
    </section>
</template>

<style scoped>
/* Use the deep selector to target elements inside the v-html content */
/* This is the only way I found to style the markdown content 'properly' from Strapi 5 */
:deep(.recipe-markdown p) {
    margin-bottom: 1rem;
    line-height: 1.6;
}

:deep(.recipe-markdown hr) {
    margin: 1rem 0 1rem 0;
    border: none;
    border-top: 1px solid #ddd;
}
</style>