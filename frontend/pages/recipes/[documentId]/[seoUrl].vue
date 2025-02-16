<script setup lang="ts">
const recipePageStore = useRecipePageStore()
await recipePageStore.fetchRecipePageData()

const recipesStore = useRecipesStore()
await recipesStore.fetchRecipes()

usePreloadImage(recipePageStore.recipePageImageUrl)

useSeoMeta({
    title: recipesStore.data?.[0].seo?.metaTitle,
    description: recipesStore.data?.[0].seo?.metaDescription,
    ogTitle: recipesStore.data?.[0].seo?.metaTitle,
    ogDescription: recipesStore.data?.[0].seo?.metaDescription,
    ogUrl: recipesStore.data?.[0].seo?.canonicalURL,
    keywords: recipesStore.data?.[0].seo?.keywords
})
</script>

<template>
    <div>
        <PageHero :title="recipePageStore.data?.recipePageTitle || 'Our recipes'"
            :description="recipePageStore.data?.recipePageDescription || 'Explore our delicious recipes'"
            :showDietaryGuide="false" :heroImageUrl="recipePageStore.recipePageImageUrl" />
        <RecipeSection />
    </div>
</template>