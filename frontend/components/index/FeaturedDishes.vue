<script setup lang="ts">
import { useDishesStore } from '~/stores/dishes'

const dishesStore = useDishesStore()
await dishesStore.fetchDishes()
</script>

<template>
    <section class="text-black px-4 md:px-0 h-auto md:h-[40rem]">
        <Container class="flex flex-col justify-center h-full">
            <h1 class="text-3xl md:text-4xl font-bold">Featured Dishes</h1>
            <p class="text-lg md:text-2xl">Our featured dishes.</p>
            <div class="flex flex-col md:flex-row gap-4 mt-8">
                <template v-if="dishesStore.loading">
                    <ItemCard v-for="n in 3" :key="n" :loading="true" title="" :price="0" description=""
                        :imageUrl="{ url: '', formats: { large: null, medium: null, small: null, thumbnail: null } }" />
                </template>
                <template v-else>
                    <ItemCard v-for="dish in dishesStore.data" :key="dish.id" :title="dish.dishTitle"
                        :description="dish.dishDescription" :price="dish.dishPrice" :imageUrl="dish.dishImage" />
                </template>
            </div>
            <div class="flex justify-center">
                <AppButton variant="primary" link="/menu" class="mt-8">
                    {{ dishesStore.loading ? 'Loading...' : 'Explore Menu' }}
                </AppButton>
            </div>
        </Container>
    </section>
</template>