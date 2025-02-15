<script setup lang="ts">
import { ChevronsDown } from 'lucide-vue-next';
import { useSiteStore } from '~/stores/site';
const siteStore = useSiteStore();

interface Props {
    title: string;
    description: string;
    isOpen: boolean;
    isLoading?: boolean;
    heroImageUrl?: string | null;
    openingHours: OpeningHour[];
}

interface OpeningHour {
    id: number;
    openingHoursDay: string;
    startingTime: string;
    endingTime: string;
}

defineProps<Props>();

const emit = defineEmits(['scroll']);

const todaysFormattedOpeningHours = computed(() => {
    const currentDayName = new Date().toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Bangkok' });
    return siteStore.formattedOpeningHours.find(hour => hour.openingHoursDay === currentDayName);
});
</script>

<template>
    <section class="relative text-white p-4 m-4 h-[calc(100dvh-2rem)] rounded-4xl overflow-hidden">
        <NuxtImg v-if="heroImageUrl" :src="heroImageUrl"
            class="absolute inset-0 w-full h-full object-cover brightness-50 -z-10" loading="eager" alt="" />
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-400 to-pink-400 opacity-60 -z-20"></div>

        <Container class="flex flex-col justify-center h-full relative">
            <div class="flex flex-col items-start">
                <template v-if="isLoading">
                    <div class="animate-pulse">
                        <div class="h-20 bg-white/20 rounded w-3/4 mb-4"></div>
                        <div class="h-8 bg-white/20 rounded w-1/2"></div>
                    </div>
                </template>
                <template v-else>
                    <h1 class="text-5xl md:text-8xl font-bold">{{ title }}</h1>
                    <p class="text-lg md:text-2xl">{{ description }}</p>
                    <AppButton variant="primary" link="/menu">Explore Menu</AppButton>
                </template>
                <div class="flex items-center gap-2 mt-4">
                    <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                        <span class="relative flex size-3">
                            <span class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                                :class="isOpen ? 'bg-green-400' : 'bg-red-400'"></span>
                            <span class="relative inline-flex size-3 rounded-full"
                                :class="isOpen ? 'bg-green-400' : 'bg-red-400'"></span>
                        </span>
                        <span class="text-sm font-medium">
                            {{ isOpen ? `Open Now · ${todaysFormattedOpeningHours?.startingTime} -
                            ${todaysFormattedOpeningHours?.endingTime}` :
                                'Closed' }}
                        </span>
                    </div>
                </div>
            </div>
            <ChevronsDown @click="emit('scroll')"
                class="w-12 h-12 absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer" />
        </Container>
    </section>
</template>