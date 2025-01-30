<script setup lang="ts">
interface Props {
    title: string;
    description: string;
    bgColor: string;
}

defineProps<Props>();
</script>

<template>
    <div
        :class="[bgColor, 'flex-1 flex flex-col gap-2 p-4 rounded-xl h-64 hover:flex-[3] transition-all duration-500 ease-in-out cursor-pointer']">
        <h2 class="text-2xl font-bold">{{ title }}</h2>
        <p class="text-lg">{{ description }}</p>
    </div>
</template>