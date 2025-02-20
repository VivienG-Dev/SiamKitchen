<script setup lang="ts">
const recipePageStore = useRecipePageStore()
await recipePageStore.fetchRecipePageData()

usePreloadImage(recipePageStore.recipePageImageUrl?.formats?.large?.url)
usePreloadImage(recipePageStore.recipePageImageUrl?.url)

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
            :heroImageUrl="recipePageStore.recipePageImageUrl" />
        <RecipesSection />
    </div>
</template>