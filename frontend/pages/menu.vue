<script setup lang="ts">
const breakfastItems = [
    {
        title: 'Pad Thai',
        price: 10,
        description: 'A popular Thai dish made with stir-fried noodles, vegetables, and a flavorful sauce.',
        imageUrl: '/pad-thai.jpg'
    },
    {
        title: 'Green Curry',
        price: 12,
        description: 'A fragrant Thai curry made with coconut milk, vegetables, and your choice of protein.',
        imageUrl: '/pad-thai.jpg'
    }
];
</script>

<template>
    <div>
        <PageHero title="Our menu" description="Explore our delicious offerings" :showDietaryGuide="true" />
        <MenuSection />
    </div>
</template>