<script setup lang="ts">
import { ref } from 'vue'
import { dietaryIcons as constantDietaryIcons } from '~/constants/dietary'

interface Props {
    title: string;
    description: string;
    showDietaryGuide?: boolean;
    heroImageUrl?: {
        url: string | null;
        formats?: {
            large?: { url: string; width: number; height: number } | undefined;
        } | null;
    } | null;
}

const props = defineProps<Props>();

const showDietaryIcons = ref(false);

const mappedDietaryIcons = constantDietaryIcons.map((item) => ({
    name: item.label.charAt(0).toUpperCase() + item.label.slice(1).replace('_', ' '),
    icon: item.icon,
    color: item.color,
    textColor: item.textColor
}));

const isMenuPage = computed(() => {
    return useRoute().path.includes('menu')
})

const cleanHeroTitle = props.title.replace('| Siam Kitchen', '');
</script>

<template>
    <section class="relative text-white p-4 m-4 h-[15rem] md:h-[20rem] rounded-4xl overflow-hidden">
        <picture>
            <source v-if="heroImageUrl?.formats?.large?.url" :srcset="heroImageUrl.formats.large.url"
                media="(max-width: 768px)" fetchpriority="high" />
            <source v-if="heroImageUrl?.url" :srcset="heroImageUrl.url" media="(min-width: 769px)"
                fetchpriority="high" />
            <NuxtImg v-if="heroImageUrl" :src="heroImageUrl.url || heroImageUrl.formats?.large?.url"
                class="absolute inset-0 w-full h-full object-cover brightness-50 -z-10" loading="eager" priority
                :alt="title" />
        </picture>
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-400 to-pink-400 opacity-60 -z-20"></div>

        <Container class="flex flex-col items-center justify-center h-full" :class="{ 'mt-8': isMenuPage }">
            <div class="flex flex-col items-center">
                <h1 class="text-3xl md:text-4xl font-bold">{{ cleanHeroTitle }}</h1>
                <p class="text-lg md:text-2xl">{{ description }}</p>
            </div>
            <div v-if="showDietaryGuide" class="flex flex-row gap-2 md:gap-4">
                <AppButton variant="primary" class="mt-0 md:mt-8" @click="showDietaryIcons = !showDietaryIcons">
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
                <div v-for="item in mappedDietaryIcons" :key="item.name"
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