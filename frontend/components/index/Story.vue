<script setup lang="ts">
interface Props {
    title?: string;
    description?: string;
}

withDefaults(defineProps<Props>(), {
    title: 'Our Story',
    description: 'The family-owned restaurant that specializes in traditional Thai cuisine.'
})
</script>

<template>
    <section class="bg-gradient-to-br from-blue-400 via-blue-300 to-green-300 text-white m-4 h-[30rem] rounded-4xl">
        <Container class="flex flex-col items-center justify-center h-full relative">
            <div class="flex flex-col p-4">
                <h1 class="text-5xl md:text-8xl font-bold text-center">{{ title }}</h1>
                <p class="text-lg md:text-2xl">{{ description }}</p>
            </div>
        </Container>
    </section>
</template>