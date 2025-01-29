<script setup lang="ts">
import { ChevronsDown } from 'lucide-vue-next';
import { ref, computed } from 'vue';

const nextSection = ref<HTMLElement | null>(null);

const scrollToRef = () => {
    nextSection.value?.scrollIntoView({ behavior: 'smooth' });
}

const isOpen = computed(() => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 10 && hours < 22;
});
</script>

<template>
    <div>
        <section
            class="bg-gradient-to-br from-blue-400 via-blue-300 to-green-300 text-white p-4 m-4 h-[calc(100dvh-2rem)] rounded-4xl">
            <Container class="flex flex-col justify-center h-full relative">
                <div class="flex flex-col items-start">
                    <h1 class="text-5xl md:text-8xl font-bold">Siam Kitchen</h1>
                    <p class="text-lg md:text-2xl">The family-owned restaurant that specializes in traditional
                        Thai cuisine.</p>
                    <Button variant="primary" link="/menu">Explore Menu</Button>
                    <div class="flex items-center gap-2 mt-4">
                        <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                            <div class="w-2 h-2 rounded-full"
                                :class="isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'">
                            </div>
                            <span class="text-sm font-medium">
                                {{ isOpen ? 'Open Now' : 'Closed' }} · 10:00 - 22:00
                            </span>
                        </div>
                    </div>
                </div>
                <ChevronsDown @click="scrollToRef"
                    class="w-12 h-12 absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                    href="#nextSection" />
            </Container>
        </section>

        <section ref="nextSection" class="text-black px-4 md:px-0 h-[35rem]">
            <Container class="flex flex-col justify-center h-full">
                <h1 class="text-3xl md:text-4xl font-bold">Promotions</h1>
                <p class="text-lg md:text-2xl">We offer a variety of promotions to our customers.</p>
                <div class="flex flex-row gap-4 mt-8">
                    <div
                        class="flex-1 flex flex-col gap-2 bg-amber-300 p-4 rounded-xl h-64 hover:flex-[3] transition-all duration-500 ease-in-out cursor-pointer">
                        <h2 class="text-2xl font-bold">Family Pack</h2>
                        <p class="text-lg">Get a family pack of 4 meals for only $100.</p>
                    </div>
                    <div
                        class="flex-1 flex flex-col gap-2 bg-green-300 p-4 rounded-xl h-64 hover:flex-[3] transition-all duration-500 ease-in-out cursor-pointer">
                        <h2 class="text-2xl font-bold">Lunch Pack</h2>
                        <p class="text-lg">Get a lunch pack of 3 meals for only $100.</p>
                    </div>
                    <div
                        class="flex-1 flex flex-col gap-2 bg-blue-300 p-4 rounded-xl h-64 hover:flex-[3] transition-all duration-500 ease-in-out cursor-pointer">
                        <h2 class="text-2xl font-bold">Dinner Pack</h2>
                        <p class="text-lg">Get a dinner pack of 3 meals for only $100.</p>
                    </div>
                </div>
            </Container>
        </section>

        <section class="bg-gradient-to-br from-blue-400 via-blue-300 to-green-300 text-white m-4 h-[30rem] rounded-4xl">
            <Container class="flex flex-col items-center justify-center h-full relative">
                <div class="flex flex-col">
                    <h1 class="text-5xl md:text-8xl font-bold text-center">Our Story</h1>
                    <p class="text-lg md:text-2xl">The family-owned restaurant that specializes in traditional
                        Thai cuisine.</p>
                </div>
            </Container>
        </section>

        <section class="text-black px-4 md:px-0 h-auto md:h-[40rem]">
            <Container class="flex flex-col justify-center h-full">
                <h1 class="text-3xl md:text-4xl font-bold">Featured Dishes</h1>
                <p class="text-lg md:text-2xl">Our featured dishes.</p>
                <div class="flex flex-col md:flex-row gap-4 mt-8">
                    <Card
                        class="flex-1 flex flex-col h-auto bg-white p-2 shadow-sm hover:shadow-lg rounded-xl transition-shadow duration-300 hover:shadow-blue-300/50">
                        <NuxtImg src="../public/pad-thai.jpg" alt="Pad Thai"
                            class="rounded-xl w-full h-48 object-cover" />
                        <div class="flex flex-col gap-2 backdrop-blur-sm p-4 rounded-xl">
                            <CardHeader class="flex flex-row justify-between">
                                <CardTitle class="text-2xl font-bold">Pad Thai</CardTitle>
                                <span class="text-lg text-green-500 font-medium">
                                    $10
                                </span>
                            </CardHeader>
                            <CardContent>
                                <p class="text-md">A popular Thai dish made with stir-fried noodles, vegetables, and a
                                    flavorful sauce.
                                </p>
                            </CardContent>
                        </div>
                    </Card>
                    <Card class="flex-1 flex flex-col h-auto bg-white p-2 shadow-sm rounded-xl cursor-pointer">
                        <NuxtImg src="../public/pad-thai.jpg" alt="Pad Thai"
                            class="rounded-xl w-full h-48 object-cover" />
                        <div class="flex flex-col gap-2 backdrop-blur-sm p-4 rounded-xl">
                            <CardHeader class="flex flex-row justify-between">
                                <CardTitle class="text-2xl font-bold">Pad Thai</CardTitle>
                                <span class="text-lg text-green-500 font-medium">
                                    $10
                                </span>
                            </CardHeader>
                            <CardContent>
                                <p class="text-md">A popular Thai dish made with stir-fried noodles, vegetables, and a
                                    flavorful sauce.
                                </p>
                            </CardContent>
                        </div>
                    </Card>
                    <Card class="flex-1 flex flex-col h-auto bg-white p-2 shadow-sm rounded-xl cursor-pointer">
                        <NuxtImg src="../public/pad-thai.jpg" alt="Pad Thai"
                            class="rounded-xl w-full h-48 object-cover" />
                        <div class="flex flex-col gap-2 backdrop-blur-sm p-4 rounded-xl">
                            <CardHeader class="flex flex-row justify-between">
                                <CardTitle class="text-2xl font-bold">Pad Thai</CardTitle>
                                <span class="text-lg text-green-500 font-medium">
                                    $10
                                </span>
                            </CardHeader>
                            <CardContent>
                                <p class="text-md">A popular Thai dish made with stir-fried noodles, vegetables, and a
                                    flavorful sauce.
                                </p>
                            </CardContent>
                        </div>
                    </Card>
                </div>
                <div class="flex justify-center">
                    <Button variant="primary" link="/menu" class="mt-8">Explore Menu</Button>
                </div>
            </Container>
        </section>

        <!-- <section class="text-black px-4 md:px-0 h-auto md:h-[40rem]">
            <Container class="flex flex-row items-center h-full">
                <div class="flex flex-col gap-1 flex-1">
                    <h2 class="text-2xl font-bold">Pad Thai</h2>
                    <p class="text-lg md:text-2xl">A popular Thai dish made with stir-fried noodles, vegetables, and a
                        flavorful sauce.</p>
                </div>
                <div class="relative flex flex-1">
                    <NuxtImg src="../public/pad-thai.jpg" alt="Pad Thai"
                        class="absolute bottom-0 left-80 rounded-xl w-52 h-64 object-cover" />
                    <NuxtImg src="../public/pad-thai.jpg" alt="Pad Thai"
                        class="absolute bottom-20 left-50 rounded-xl w-52 h-64 object-cover" />
                    <NuxtImg src="../public/pad-thai.jpg" alt="Pad Thai"
                        class="absolute top-0 left-30 rounded-xl w-52 h-64 object-cover" />
                </div>

            </Container>
        </section> -->

        <footer class="bg-gray-700 h-auto">
            <Container>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-white pt-8">
                    <div>
                        <h3 class="font-bold text-2xl">Address</h3>
                        <p>123 Main St, Anytown, USA</p>
                    </div>
                    <div>
                        <h3 class="font-bold text-2xl">Hours</h3>
                        <p>Mon - Fri: 10:00 - 22:00</p>
                        <p>Sat - Sun: 10:00 - 22:00</p>
                    </div>
                    <div>
                        <h3 class="font-bold text-2xl">Quick links</h3>
                        <ul>
                            <li><a href=" #">Home</a></li>
                            <li><a href="#">Menu</a></li>
                            <li><a href="#">Recipes</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div class="mt-8 py-8 border-t border-white/20 text-center text-white">
                    <p>© 2025 Siam Kitchen. Made with ❤️ by VivienG</p>
                </div>
            </Container>
        </footer>
    </div>
</template>
