<script setup lang="ts">
interface Props {
    title: string;
    description: string;
}

defineProps<Props>();
</script>

<template>
    <section class="bg-gradient-to-br from-blue-400 via-blue-300 to-green-300 text-white p-4 m-4 h-[20rem] rounded-4xl">
        <Container class="flex flex-col items-center justify-center h-full">
            <div class="flex flex-col items-center">
                <h1 class="text-3xl md:text-4xl font-bold">{{ title }}</h1>
                <p class="text-lg md:text-2xl">{{ description }}</p>
            </div>
        </Container>
    </section>
</template>