<script setup lang="ts">
import { Home, Menu, X } from 'lucide-vue-next'
const siteStore = useSiteStore()
import { debounce } from 'lodash-es'

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

const navItems = [
    { title: 'Home', href: '/' },
    { title: 'Menu', href: '/menu' },
    { title: 'Recipes', href: '/recipes' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' }
]

function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleScroll = debounce(() => {
    isScrolled.value = window.scrollY > 20
}, 50)

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <nav class="fixed transition-all duration-300 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] bg-white/90 backdrop-blur-sm shadow-lg rounded-4xl px-8 py-2"
        :class="[isScrolled ? 'top-2' : 'top-6']">
        <div class="flex items-center justify-between">
            <!-- Brand -->
            <NuxtLink to="/" class="flex items-center space-x-2">
                <Home class="w-6 h-6 text-primary" />
                <span class="font-bold text-xl text-primary">{{ siteStore.data?.data.siteName }}</span>
            </NuxtLink>
            <!-- Desktop navigation -->
            <div class="hidden md:flex space-x-4">
                <NuxtLink v-for="item in navItems" :key="item.title" :to="item.href"
                    class="relative px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200"
                    :class="{ 'text-gray-700': $route.path === item.href }">
                    {{ item.title }}
                    <span
                        class="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-out"
                        :class="[$route.path === item.href ? 'scale-x-100' : 'scale-x-0', 'group-hover:scale-x-100']"></span>
                </NuxtLink>
            </div>
            <!-- Mobile menu button -->
            <div class="md:hidden">
                <button @click="toggleMobileMenu"
                    class="p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200">
                    <template v-if="!mobileMenuOpen">
                        <Menu class="w-6 h-6" />
                    </template>
                    <template v-else>
                        <X class="w-6 h-6" />
                    </template>
                </button>
            </div>
        </div>

        <!-- Mobile navigation menu -->
        <Transition enter-active-class="transition-all duration-300 ease-in-out"
            leave-active-class="transition-all duration-200 ease-in-out"
            enter-from-class="opacity-0 transform -translate-y-2 max-h-0"
            enter-to-class="opacity-100 transform translate-y-0 max-h-[400px]"
            leave-from-class="opacity-100 transform translate-y-0 max-h-[400px]"
            leave-to-class="opacity-0 transform -translate-y-2 max-h-0">
            <div v-if="mobileMenuOpen" class="mt-2 overflow-hidden md:hidden">
                <div class="flex flex-col space-y-1 py-2">
                    <NuxtLink v-for="item in navItems" :key="item.title" :to="item.href"
                        class="block px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
                        @click="mobileMenuOpen = false">
                        {{ item.title }}
                    </NuxtLink>
                </div>
            </div>
        </Transition>
    </nav>
</template>