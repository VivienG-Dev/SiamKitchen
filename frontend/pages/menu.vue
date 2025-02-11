<script setup lang="ts">
import { useMenuPageStore } from '~/stores/menuPage'

const menuPageStore = useMenuPageStore()
await menuPageStore.fetchMenuPageData()

useHead(() => ({
    link: menuPageStore.menuPageImageUrl ? [{ rel: 'preload', href: menuPageStore.menuPageImageUrl, as: 'image' }] : []
}))
</script>

<template>
    <div>
        <PageHero :title="menuPageStore.data?.menuPageTitle || 'Our Menu'"
            :description="menuPageStore.data?.menuPageDescription || 'Explore our delicious offerings'"
            :showDietaryGuide="true" :heroImageUrl="menuPageStore.menuPageImageUrl" />
        <MenuSection />
    </div>
</template>