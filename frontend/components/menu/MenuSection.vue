<script setup lang="ts">
import {
    Leaf,
    FlameKindling,
    CircleAlert,
    Heart,
    CircleDot,
    Shell,
    Coffee,
    Sandwich,
    Star,
    BadgeAlert,
    Apple,
    CircleCheck
} from 'lucide-vue-next';

interface MenuItem {
    title: string;
    price: number;
    description: string;
    imageUrl: string;
    category: 'breakfast' | 'lunch' | 'dinner' | 'desserts' | 'drinks';
    dietary?: string[];
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

const dietaryIcons = [
    { icon: Leaf, label: 'Vegetarian', color: 'bg-green-500', textColor: 'text-green-700' },
    { icon: Apple, label: 'Vegan', color: 'bg-emerald-500', textColor: 'text-emerald-700' },
    { icon: CircleCheck, label: 'Gluten-Free', color: 'bg-amber-500', textColor: 'text-amber-700' },
    { icon: Sandwich, label: 'Contains Meat', color: 'bg-red-700', textColor: 'text-red-700' },
    { icon: Shell, label: 'Contains Seafood', color: 'bg-blue-500', textColor: 'text-blue-700' },
    { icon: FlameKindling, label: 'Spicy', color: 'bg-orange-500', textColor: 'text-orange-700' },
    { icon: Coffee, label: 'Contains Dairy', color: 'bg-cyan-500', textColor: 'text-cyan-700' },
    { icon: CircleDot, label: 'Contains Eggs', color: 'bg-yellow-500', textColor: 'text-yellow-700' },
    { icon: Heart, label: 'Heart Healthy', color: 'bg-rose-500', textColor: 'text-rose-700' },
    { icon: CircleAlert, label: 'Contains Nuts', color: 'bg-brown-500', textColor: 'text-brown-700' },
    { icon: BadgeAlert, label: 'Common Allergens', color: 'bg-purple-500', textColor: 'text-purple-700' },
    { icon: Star, label: 'Halal', color: 'bg-teal-500', textColor: 'text-teal-700' }
];

onMounted(async () => {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        menuItems.value = [
            {
                title: 'Pad Thai',
                price: 10,
                description: 'A popular Thai dish made with stir-fried noodles, vegetables, and a flavorful sauce.',
                imageUrl: '/pad-thai.jpg',
                category: 'lunch',
                dietary: [
                    'Vegetarian',
                    'Vegan',
                    'Gluten-Free',
                    'Common Allergens',
                    'Halal'
                ]
            },
            {
                title: 'Green Curry',
                price: 12,
                description: 'A fragrant Thai curry made with coconut milk, vegetables, and your choice of protein.',
                imageUrl: '/pad-thai.jpg',
                category: 'dinner',
                dietary: ['Contains Eggs', 'Contains Nuts', 'Spicy']
            },
            {
                title: 'Thai Iced Tea',
                price: 4,
                description: 'Traditional Thai tea served with cream and ice.',
                imageUrl: '/pad-thai.jpg',
                category: 'drinks',
                dietary: ['Contains Dairy']
            },
            {
                title: 'Mango Sticky Rice',
                price: 6,
                description: 'Sweet sticky rice served with fresh mango and coconut cream.',
                imageUrl: '/pad-thai.jpg',
                category: 'desserts',
                dietary: ['Contains Eggs']
            },
            {
                title: 'Morning Glory',
                price: 8,
                description: 'Traditional Thai breakfast with eggs and rice.',
                imageUrl: '/pad-thai.jpg',
                category: 'breakfast',
                dietary: ['Contains Eggs']
            },
            {
                title: 'Tom Yum Soup',
                price: 8,
                description: 'A hot and sour Thai soup with lemongrass, lime leaves, and mushrooms.',
                imageUrl: '/pad-thai.jpg',
                category: 'lunch',
                dietary: ['Contains Eggs', 'Contains Nuts', 'Spicy']
            },
            {
                title: 'Pad See Ew',
                price: 10,
                description: 'Stir-fried noodles with vegetables and your choice of protein.',
                imageUrl: '/pad-thai.jpg',
                category: 'breakfast',
                dietary: ['Contains Eggs']
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
    <section class="text-black px-4 md:px-4 lg:px-4 xl:px-0">
        <Container class="flex flex-col">
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
                <div v-for="category in itemsByCategory" :key="category.id" class="mb-16 relative">
                    <div class="mb-8 relative">
                        <div class="flex items-center justify-between pb-4 border-b-2 border-blue-100">
                            <div>
                                <h3 class="text-3xl font-bold text-blue-900 mb-2">{{ category.name }}</h3>
                                <p class="text-gray-600 italic">{{ category.description }}</p>
                            </div>
                            <div class="hidden md:block text-blue-500 opacity-10 text-8xl font-bold">
                                {{ category.name[0] }}
                            </div>
                        </div>
                    </div>

                    <div v-if="category.items.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MenuItemCard v-for="item in category.items" :key="item.title" v-bind="item"
                            :dietary-icons="dietaryIcons" />
                    </div>
                    <div v-else class="bg-gray-50 rounded-xl p-8 text-center text-gray-500 border border-gray-200">
                        <p class="text-lg">No items available in this category</p>
                        <p class="text-sm text-gray-400">Check back soon for updates!</p>
                    </div>
                </div>
            </template>
        </Container>
    </section>
</template>