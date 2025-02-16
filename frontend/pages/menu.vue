<script setup lang="ts">
import { useMenuPageStore } from '~/stores/menuPage'

const menuPageStore = useMenuPageStore()
await menuPageStore.fetchMenuPageData()

usePreloadImage(menuPageStore.menuPageImageUrl)

useSeoMeta({
    title: menuPageStore.data?.seo?.metaTitle,
    description: menuPageStore.data?.seo?.metaDescription,
    ogTitle: menuPageStore.data?.seo?.metaTitle,
    ogDescription: menuPageStore.data?.seo?.metaDescription,
    ogUrl: menuPageStore.data?.seo?.canonicalURL,
    keywords: menuPageStore.data?.seo?.keywords
})
</script>

<template>
    <div>
        <PageHero :title="menuPageStore.data?.menuPageTitle || 'Our Menu'"
            :description="menuPageStore.data?.menuPageDescription || 'Explore our delicious offerings'"
            :showDietaryGuide="true" :heroImageUrl="menuPageStore.menuPageImageUrl" />
        <MenuSection />
    </div>
</template>