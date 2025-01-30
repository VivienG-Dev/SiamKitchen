<script setup lang="ts">
import { ChevronsDown } from 'lucide-vue-next';

interface Props {
    title: string;
    description: string;
    isOpen: boolean;
}

defineProps<Props>();

const emit = defineEmits(['scroll']);
</script>

<template>
    <section
        class="bg-gradient-to-br from-blue-400 via-blue-300 to-green-300 text-white p-4 m-4 h-[calc(100dvh-2rem)] rounded-4xl">
        <Container class="flex flex-col justify-center h-full relative">
            <div class="flex flex-col items-start">
                <h1 class="text-5xl md:text-8xl font-bold">{{ title }}</h1>
                <p class="text-lg md:text-2xl">{{ description }}</p>
                <AppButton variant="primary" link="/menu">Explore Menu</AppButton>
                <div class="flex items-center gap-2 mt-4">
                    <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                        <div class="w-2 h-2 rounded-full" :class="isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'">
                        </div>
                        <span class="text-sm font-medium">
                            {{ isOpen ? 'Open Now' : 'Closed' }} · 10:00 - 22:00
                        </span>
                    </div>
                </div>
            </div>
            <ChevronsDown @click="emit('scroll')"
                class="w-12 h-12 absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer" />
        </Container>
    </section>
</template>