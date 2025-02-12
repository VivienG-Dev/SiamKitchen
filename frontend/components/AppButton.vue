<script setup lang="ts">
const props = defineProps<{
    variant: 'primary' | 'secondary' | 'outline' | 'ghost';
    link?: string;
}>();

const variantClasses = computed(() => ({
    'primary': 'bg-secondary text-white hover:bg-secondary-light hover:text-white',
    'secondary': 'bg-white text-secondary hover:bg-secondary-light hover:text-white',
    'outline': 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary',
    'ghost': 'bg-transparent text-white hover:text-primary shadow-none underline underline-offset-2 decoration-primary decoration-2 hover:scale-none hover:rotate-none'
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
