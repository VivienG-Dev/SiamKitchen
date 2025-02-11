<script setup lang="ts">
const recipePageStore = useRecipePageStore()
await recipePageStore.fetchRecipePageData()
</script>

<template>
    <div>
        <PageHero :title="recipePageStore.data?.recipePageTitle || 'Our recipes'"
            :description="recipePageStore.data?.recipePageDescription || 'Explore our delicious recipes'"
            :showDietaryGuide="false" :heroImageUrl="recipePageStore.recipePageImageUrl" />
        <RecipesSection />
    </div>
</template>