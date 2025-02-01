<script setup lang="ts">
interface MenuItem {
    title: string;
    price: number;
    description: string;
    imageUrl: string;
    category: 'breakfast' | 'lunch' | 'dinner' | 'desserts' | 'drinks';
}

const isLoading = ref(true);
const menuItems = ref<MenuItem[]>([]);

const categories = [
    { id: 'breakfast', name: 'Breakfast', description: 'Available from 7:00 AM to 10:00 AM' },
    { id: 'lunch', name: 'Lunch', description: 'Available from 11:00 AM to 3:00 PM' },
    { id: 'dinner', name: 'Dinner', description: 'Available from 5:00 PM to 10:00 PM' },
    { id: 'desserts', name: 'Desserts', description: 'Sweet treats available all day' },
    { id: 'drinks', name: 'Drinks', description: 'Refreshing beverages for any time' }
];

const itemsByCategory = computed(() => {
    return categories.map(category => ({
        ...category,
        items: menuItems.value.filter(item => item.category === category.id)
    }));
});

onMounted(async () => {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In the future, this would be an API call
        menuItems.value = [
            {
                title: 'Pad Thai',
                price: 10,
                description: 'A popular Thai dish made with stir-fried noodles, vegetables, and a flavorful sauce.',
                imageUrl: '/pad-thai.jpg',
                category: 'lunch'
            },
            {
                title: 'Green Curry',
                price: 12,
                description: 'A fragrant Thai curry made with coconut milk, vegetables, and your choice of protein.',
                imageUrl: '/pad-thai.jpg',
                category: 'dinner'
            },
            {
                title: 'Thai Iced Tea',
                price: 4,
                description: 'Traditional Thai tea served with cream and ice.',
                imageUrl: '/pad-thai.jpg',
                category: 'drinks'
            },
            {
                title: 'Mango Sticky Rice',
                price: 6,
                description: 'Sweet sticky rice served with fresh mango and coconut cream.',
                imageUrl: '/pad-thai.jpg',
                category: 'desserts'
            },
            {
                title: 'Morning Glory',
                price: 8,
                description: 'Traditional Thai breakfast with eggs and rice.',
                imageUrl: '/pad-thai.jpg',
                category: 'breakfast'
            },
            {
                title: 'Tom Yum Soup',
                price: 8,
                description: 'A hot and sour Thai soup with lemongrass, lime leaves, and mushrooms.',
                imageUrl: '/pad-thai.jpg',
                category: 'lunch'
            },
            {
                title: 'Pad See Ew',
                price: 10,
                description: 'Stir-fried noodles with vegetables and your choice of protein.',
                imageUrl: '/pad-thai.jpg',
                category: 'breakfast'
            }
        ];
    } catch (error) {
        console.error('Error loading menu items:', error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <section class="text-black px-4 md:px-0">
        <Container class="flex flex-col">
            <div class="flex flex-col py-8">
                <h2 class="text-xl md:text-3xl font-bold text-center">Our Menu</h2>
                <p class="text-sm md:text-lg text-center text-gray-600 mb-8">Explore our delicious offerings</p>
            </div>

            <template v-if="isLoading">
                <div v-for="n in 3" :key="n" class="mb-12">
                    <div class="animate-pulse mb-4">
                        <div class="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <MenuItemCard v-for="i in 2" :key="i" :loading="true" title="" :price="0" description=""
                            imageUrl="" />
                    </div>
                </div>
            </template>

            <template v-else>
                <div v-for="category in itemsByCategory" :key="category.id" class="mb-12">
                    <div class="mb-4">
                        <h3 class="text-2xl font-bold">{{ category.name }}</h3>
                        <p class="text-gray-600">{{ category.description }}</p>
                    </div>

                    <div v-if="category.items.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <MenuItemCard v-for="item in category.items" :key="item.title" v-bind="item" />
                    </div>
                    <div v-else class="bg-gray-100 rounded-xl p-4 text-center text-gray-500">
                        No items available in this category
                    </div>
                </div>
            </template>
        </Container>
    </section>
</template>