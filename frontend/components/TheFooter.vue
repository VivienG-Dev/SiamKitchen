<script setup lang="ts">
const siteStore = useSiteStore()

interface QuickLink {
    title: string;
    href: string;
}

const quickLinks: QuickLink[] = [
    { title: 'Home', href: '/' },
    { title: 'Menu', href: '/menu' },
    { title: 'Recipes', href: '/recipes' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' }
];

const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="bg-gray-700 h-auto mt-12">
        <Container>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-white pt-8">
                <div>
                    <h3 class="font-bold text-2xl">Address</h3>
                    <p>123 Main St, Anytown, USA</p>
                </div>
                <div>
                    <h3 class="font-bold text-2xl">Hours</h3>
                    <div v-for="hour in siteStore.formattedOpeningHours" :key="hour.id">
                        <p>{{ hour.openingHoursDay }}: {{ hour.startingTime === 'Closed' ? 'Closed' :
                            `${hour.startingTime} - ${hour.endingTime}` }}</p>
                    </div>
                </div>
                <div>
                    <h3 class="font-bold text-2xl">Quick links</h3>
                    <ul>
                        <li v-for="link in quickLinks" :key="link.title">
                            <a :href="link.href">{{ link.title }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mt-8 py-8 border-t border-white/20 text-center text-white">
                <p>© {{ currentYear }} {{ siteStore.data?.data.siteName }}. Made with ❤️ by VivienG</p>
            </div>
        </Container>
    </footer>
</template>