<script setup lang="ts">
const promotionsSection = ref<HTMLElement | null>(null)
const siteStore = useSiteStore()

useHead(() => ({
    link: siteStore.heroImageUrl ? [{ rel: 'preload', href: siteStore.heroImageUrl, as: 'image' }] : []
}))

const scrollToPromotions = () => {
    promotionsSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const isOpen = computed(() => {
    const now = new Date()
    const hours = now.getHours()
    return hours >= 10 && hours < 22
})
</script>

<template>
    <div>
        <IndexHero :heroImageUrl="siteStore.data?.data.heroImage?.url"
            :title="siteStore.data?.data.siteName ?? 'Siam ???'"
            :description="siteStore.data?.data.siteDescription ?? 'The family-owned restaurant that specializes in traditional Thai cuisine.'"
            :isOpen="isOpen" @scroll="scrollToPromotions" :loading="siteStore.loading" />

        <IndexPromotions ref="promotionsSection" />

        <IndexStory />

        <IndexFeaturedDishes />
    </div>
</template>
