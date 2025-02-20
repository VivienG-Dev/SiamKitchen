<script setup lang="ts">
const featuredDishesSection = ref<HTMLElement | null>(null)
const siteStore = useSiteStore()

usePreloadImage(siteStore.heroImageUrl)
usePreloadImage(siteStore.heroImageMobileUrl)

const scrollToFeaturedDishes = () => {
    featuredDishesSection.value?.scrollIntoView({ behavior: 'smooth' })
}

useSeoMeta({
    title: siteStore.data?.data.seo.metaTitle,
    ogTitle: siteStore.data?.data.seo.metaTitle,
    description: siteStore.data?.data.seo.metaDescription,
    ogDescription: siteStore.data?.data.seo.metaDescription,
    ogUrl: siteStore.data?.data.seo.ogUrl,
    keywords: siteStore.data?.data.seo.keywords
})
</script>

<template>
    <div>
        <IndexHero :heroImageUrl="siteStore.data?.data.heroImage?.url"
            :heroImageMobileUrl="siteStore.data?.data.heroImageMobile?.url"
            :title="siteStore.data?.data.siteName ?? 'Siam ???'"
            :description="siteStore.data?.data.siteDescription ?? 'The family-owned restaurant that specializes in traditional Thai cuisine.'"
            :isOpen="siteStore.isOpen" @scroll="scrollToFeaturedDishes" :loading="siteStore.loading"
            :openingHours="siteStore.formattedOpeningHours" :isLoading="siteStore.loading" />

        <IndexFeaturedDishes ref="featuredDishesSection" />

        <IndexStory />
    </div>
</template>
