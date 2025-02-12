<script setup lang="ts">
const promotionsSection = ref<HTMLElement | null>(null)
const siteStore = useSiteStore()

usePreloadImage(siteStore.heroImageUrl)

const scrollToPromotions = () => {
    promotionsSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
    <div>
        <IndexHero :heroImageUrl="siteStore.data?.data.heroImage?.url"
            :title="siteStore.data?.data.siteName ?? 'Siam ???'"
            :description="siteStore.data?.data.siteDescription ?? 'The family-owned restaurant that specializes in traditional Thai cuisine.'"
            :isOpen="siteStore.isOpen" @scroll="scrollToPromotions" :loading="siteStore.loading"
            :openingHours="siteStore.formattedOpeningHours" />

        <IndexPromotions ref="promotionsSection" />

        <IndexStory />

        <IndexFeaturedDishes />
    </div>
</template>
