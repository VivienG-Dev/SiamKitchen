<script setup lang="ts">
const recipePageStore = useRecipePageStore()
await recipePageStore.fetchRecipePageData()

usePreloadImage(recipePageStore.recipePageImageUrl)

useSeoMeta({
    title: recipePageStore.data?.seo?.metaTitle,
    description: recipePageStore.data?.seo?.metaDescription,
    ogTitle: recipePageStore.data?.seo?.metaTitle,
    ogDescription: recipePageStore.data?.seo?.metaDescription,
    ogUrl: recipePageStore.data?.seo?.canonicalURL,
    keywords: recipePageStore.data?.seo?.keywords
})
</script>

<template>
    <div>
        <PageHero :title="recipePageStore.data?.recipePageTitle || 'Our recipes'"
            :description="recipePageStore.data?.recipePageDescription || 'Explore our delicious recipes'"
            :showDietaryGuide="false" :heroImageUrl="recipePageStore.recipePageImageUrl" />
        <RecipesSection />
    </div>
</template>