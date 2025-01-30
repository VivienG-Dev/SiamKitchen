<script setup lang="ts">
interface PromotionCard {
    title: string;
    description: string;
    bgColor: string;
}

const promotions: PromotionCard[] = [
    {
        title: 'Family Pack',
        description: 'Get a family pack of 4 meals for only $100.',
        bgColor: 'bg-amber-300'
    },
    {
        title: 'Lunch Pack',
        description: 'Get a lunch pack of 3 meals for only $100.',
        bgColor: 'bg-green-300'
    },
    {
        title: 'Dinner Pack',
        description: 'Get a dinner pack of 3 meals for only $100.',
        bgColor: 'bg-blue-300'
    }
];

const sectionRef = ref<HTMLElement | null>(null);
defineExpose({ scrollIntoView: () => sectionRef.value?.scrollIntoView({ behavior: 'smooth' }) });
</script>

<template>
    <section ref="sectionRef" class="text-black px-4 md:px-0 h-[35rem]">
        <Container class="flex flex-col justify-center h-full">
            <h1 class="text-3xl md:text-4xl font-bold">Promotions</h1>
            <p class="text-lg md:text-2xl">We offer a variety of promotions to our customers.</p>
            <div class="flex flex-row gap-4 mt-8">
                <IndexPromotionCard v-for="promo in promotions" :key="promo.title" v-bind="promo" />
            </div>
        </Container>
    </section>
</template>