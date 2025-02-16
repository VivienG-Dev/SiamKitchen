<script setup lang="ts">
const recipesStore = useRecipesStore()
await recipesStore.fetchRecipes()
</script>

<template>
    <section class="text-black px-4 md:px-4 lg:px-4 xl:px-0">
        <Container class="flex flex-col">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                <template v-if="recipesStore.loading">
                    <ItemCard v-for="n in 3" :key="n" :loading="true" title="" :price="0" description=""
                        :imageUrl="{ url: '', formats: {} }" />
                </template>
                <template v-else>
                    <ItemCard v-for="recipe in recipesStore.data" :key="recipe.id" :title="recipe.recipeTitle"
                        :description="recipe.recipeDescription" :imageUrl="recipe.recipeImage"
                        :link="`/recipes/${recipe.documentId}/${recipe.seoUrl}`" />
                </template>
            </div>
        </Container>
    </section>
</template>