<script setup lang="ts">
const promotionsSection = ref<HTMLElement | null>(null)
const siteStore = useSiteStore()

usePreloadImage(siteStore.heroImageUrl)

const scrollToPromotions = () => {
    promotionsSection.value?.scrollIntoView({ behavior: 'smooth' })
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
            :title="siteStore.data?.data.siteName ?? 'Siam ???'"
            :description="siteStore.data?.data.siteDescription ?? 'The family-owned restaurant that specializes in traditional Thai cuisine.'"
            :isOpen="siteStore.isOpen" @scroll="scrollToPromotions" :loading="siteStore.loading"
            :openingHours="siteStore.formattedOpeningHours" :isLoading="siteStore.loading" />

        <IndexPromotions ref="promotionsSection" />

        <IndexStory />

        <IndexFeaturedDishes />
    </div>
</template>
