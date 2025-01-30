<script setup lang="ts">
import { ref, computed } from 'vue';

const promotionsSection = ref<HTMLElement | null>(null);

const scrollToPromotions = () => {
    promotionsSection.value?.scrollIntoView({ behavior: 'smooth' });
}

const isOpen = computed(() => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 10 && hours < 22;
});
</script>

<template>
    <div>
        <IndexHero title="Siam Kitchen" description="The family-owned restaurant that specializes in traditional
            Thai cuisine." :isOpen="isOpen" @scroll="scrollToPromotions" />

        <IndexPromotions ref="promotionsSection" />

        <IndexStory />

        <IndexFeaturedDishes />
    </div>
</template>
