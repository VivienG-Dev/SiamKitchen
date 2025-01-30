<script setup lang="ts">
interface Dish {
    title: string;
    price: number;
    description: string;
    imageUrl: string;
}

const isLoading = ref(true);
const featuredDishes = ref<Dish[]>([]);

// Simulate loading data
onMounted(async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    featuredDishes.value = [
        {
            title: 'Pad Thai',
            price: 10,
            description: 'A popular Thai dish made with stir-fried noodles, vegetables, and a flavorful sauce.',
            imageUrl: '../public/pad-thai.jpg'
        },
        {
            title: 'Green Curry',
            price: 12,
            description: 'A fragrant Thai curry made with coconut milk, vegetables, and your choice of protein.',
            imageUrl: '../public/pad-thai.jpg'
        },
        {
            title: 'Tom Yum Soup',
            price: 8,
            description: 'A hot and sour Thai soup with lemongrass, lime leaves, and mushrooms.',
            imageUrl: '../public/pad-thai.jpg'
        }
    ];

    isLoading.value = false;
});
</script>

<template>
    <section class="text-black px-4 md:px-0 h-auto md:h-[40rem]">
        <Container class="flex flex-col justify-center h-full">
            <h1 class="text-3xl md:text-4xl font-bold">Featured Dishes</h1>
            <p class="text-lg md:text-2xl">Our featured dishes.</p>
            <div class="flex flex-col md:flex-row gap-4 mt-8">
                <template v-if="isLoading">
                    <IndexDishCard v-for="n in 3" :key="n" loading title="" :price="0" description="" imageUrl="" />
                </template>

                <template v-else>
                    <IndexDishCard v-for="dish in featuredDishes" :key="dish.title" v-bind="dish" />
                </template>
            </div>
            <div class="flex justify-center">
                <AppButton variant="primary" link="/menu" class="mt-8">
                    {{ isLoading ? 'Loading...' : 'Explore Menu' }}
                </AppButton>
            </div>
        </Container>
    </section>
</template>