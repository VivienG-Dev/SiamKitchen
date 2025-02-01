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

interface Props {
    title: string;
    description: string;
    showDietaryGuide?: boolean;
}

defineProps<Props>();

const showDietaryIcons = ref(false);

const dietaryIcons = [
    { name: 'Vegetarian', icon: Leaf, color: 'bg-green-500', textColor: 'text-green-700' },
    { name: 'Vegan', icon: Apple, color: 'bg-emerald-500', textColor: 'text-emerald-700' },
    { name: 'Gluten-Free', icon: CircleCheck, color: 'bg-amber-500', textColor: 'text-amber-700' },
    { name: 'Contains Meat', icon: Sandwich, color: 'bg-red-700', textColor: 'text-red-700' },
    { name: 'Contains Seafood', icon: Shell, color: 'bg-blue-500', textColor: 'text-blue-700' },
    { name: 'Spicy', icon: FlameKindling, color: 'bg-orange-500', textColor: 'text-orange-700' },
    { name: 'Contains Dairy', icon: Coffee, color: 'bg-cyan-500', textColor: 'text-cyan-700' },
    { name: 'Contains Eggs', icon: CircleDot, color: 'bg-yellow-500', textColor: 'text-yellow-700' },
    { name: 'Heart Healthy', icon: Heart, color: 'bg-rose-500', textColor: 'text-rose-700' },
    { name: 'Contains Nuts', icon: CircleAlert, color: 'bg-brown-500', textColor: 'text-brown-700' },
    { name: 'Common Allergens', icon: BadgeAlert, color: 'bg-purple-500', textColor: 'text-purple-700' },
    { name: 'Halal', icon: Star, color: 'bg-teal-500', textColor: 'text-teal-700' }
];
</script>

<template>
    <section class="bg-gradient-to-br from-blue-400 via-blue-300 to-green-300 text-white p-4 m-4 h-[20rem] rounded-4xl">
        <Container class="flex flex-col items-center justify-center h-full">
            <div class="flex flex-col items-center">
                <h1 class="text-3xl md:text-4xl font-bold">{{ title }}</h1>
                <p class="text-lg md:text-2xl">{{ description }}</p>
            </div>
            <div v-if="showDietaryGuide" class="flex flex-row gap-4">
                <AppButton variant="primary" class="mt-8" @click="showDietaryIcons = !showDietaryIcons">
                    {{ showDietaryIcons ? 'Hide' : 'Show' }} Dietary Guide
                </AppButton>
            </div>
        </Container>
    </section>

    <!-- Dietary Icons Box -->
    <Transition enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0" enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in" leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0">
        <div v-if="showDietaryIcons" class="bg-white shadow-lg rounded-xl p-6 mx-4 -mt-8 relative z-10">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
                <div v-for="item in dietaryIcons" :key="item.name"
                    class="flex flex-col items-center p-2 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div :class="['p-1.5 md:p-2 rounded-full mb-2', item.color]">
                        <component :is="item.icon" class="w-5 md:w-8 h-5 md:h-8 text-white" />
                    </div>
                    <span class="text-sm text-gray-700 text-center">{{ item.name }}</span>
                </div>
            </div>
        </div>
    </Transition>
</template>