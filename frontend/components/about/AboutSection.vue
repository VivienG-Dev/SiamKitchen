<script setup lang="ts">
import { useAboutStore } from '~/stores/about'

const aboutStore = useAboutStore()
await aboutStore.fetchAbout()
</script>

<template>
    <section class="text-gray-700 px-4 md:px-4 lg:px-4 xl:px-0">
        <Container class="flex flex-col max-w-6xl mx-auto">
            <div class="mb-16 mt-16 relative">
                <div class="absolute left-1/2 transform h-full w-px bg-primary hidden md:block"></div>

                <div class="flex flex-col gap-24">
                    <div v-for="(point, index) in aboutStore.data?.data.About" :key="point.id"
                        class="relative flex items-center justify-center">
                        <div
                            class="absolute w-12 h-12 bg-primary rounded-full text-white flex items-center justify-center z-10 md:left-1/2 md:-translate-x-1/2 left-0 -translate-x-0 top-0 -translate-y-6">
                            {{ point.aboutBlockYear || 'N/A' }}
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                            <div :class="[index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-2 md:text-left md:pl-12']"
                                class="p-6 bg-white md:bg-transparent rounded-xl shadow-md md:shadow-none flex flex-col justify-center">
                                <h3 class="text-2xl font-bold text-primary mb-3">{{ point.aboutBlockTitle }}</h3>
                                <p class="text-gray-600 leading-relaxed">{{ point.aboutBlockDescription }}</p>
                            </div>

                            <div :class="[index % 2 === 0 ? 'md:pl-12' : 'md:order-1 md:pr-12']">
                                <img :src="point.aboutBlockImage.formats?.medium?.url" :alt="point.aboutBlockTitle"
                                    class="w-full h-64 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-16">
                <h2 class="text-3xl font-bold mb-8 text-center text-gray-800">Meet Our Team</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div v-for="member in aboutStore.data?.data.Team" :key="member.id"
                        class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:shadow-primary/50 transition-shadow duration-300">
                        <img :src="member.teamImage.url" :alt="member.teamName" class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2 text-gray-800">{{ member.teamName }}</h3>
                            <p class="text-primary mb-3">{{ member.teamRole }}</p>
                            <p class="text-gray-600">{{ member.teamDescription }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </section>
</template>