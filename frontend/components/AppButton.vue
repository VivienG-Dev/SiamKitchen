<script setup lang="ts">
const props = defineProps<{
    variant: 'primary' | 'secondary' | 'outline';
    link?: string;
}>();

const variantClasses = computed(() => ({
    'primary': 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white',
    'secondary': 'bg-blue-500 text-white hover:bg-white hover:text-blue-500',
    'outline': 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-500'
})[props.variant]);
</script>

<template>
    <template v-if="link">
        <NuxtLink :to="link">
            <button :class="[
                variantClasses,
                'px-4 py-2 rounded-xl mt-4 transition-all duration-300 w-fit shadow-sm cursor-pointer hover:scale-105 active:scale-95 hover:rotate-1 font-body'
            ]">
                <slot :variant="variant" />
            </button>
        </NuxtLink>
    </template>
    <template v-else>
        <button :class="[
            variantClasses,
            'px-4 py-2 rounded-xl mt-4 transition-all duration-300 w-fit shadow-sm cursor-pointer hover:scale-105 active:scale-95 hover:rotate-1 font-body'
        ]">
            <slot :variant="variant" />
        </button>
    </template>
</template>
