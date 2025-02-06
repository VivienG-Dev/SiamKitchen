<script setup lang="ts">
interface TeamMember {
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
}

interface StoryPoint {
    year: string;
    title: string;
    description: string;
    imageUrl: string;
}

const storyPoints: StoryPoint[] = [
    {
        year: '2020',
        title: 'Our Beginning',
        description: 'Founded as a small family-owned restaurant, Siam Kitchen started with a simple dream of sharing authentic Thai flavors with our community.',
        imageUrl: '/restaurant-start.jpg'
    },
    {
        year: '2023',
        title: 'Growing Together',
        description: 'As our community grew, so did we. We expanded our menu and renovated our space while maintaining our commitment to authentic recipes.',
        imageUrl: '/pad-thai.jpg'
    },
    {
        year: '2024',
        title: 'Adapting & Thriving',
        description: 'During challenging times, we innovated with takeout services and cooking classes, bringing Thai cuisine into homes across the city.',
        imageUrl: '/restaurant-modern.jpg'
    },
    {
        year: 'Today',
        title: 'Looking Forward',
        description: 'Now a beloved local institution, we continue to evolve while staying true to our roots, serving authentic Thai cuisine with modern flair.',
        imageUrl: '/restaurant-today.jpg'
    }
];

const teamMembers: TeamMember[] = [
    {
        name: 'John Smith',
        role: 'Head Chef',
        bio: 'With over 15 years of experience in Thai cuisine, John brings authentic flavors and innovative techniques to our kitchen.',
        imageUrl: '/pad-thai.jpg'
    },
    {
        name: 'Sarah Johnson',
        role: 'Restaurant Manager',
        bio: 'Sarah ensures that every guest receives exceptional service and has a memorable dining experience.',
        imageUrl: '/manager.jpg'
    },
    {
        name: 'David Chen',
        role: 'Sous Chef',
        bio: 'David specializes in creating unique fusion dishes that blend traditional Thai flavors with modern culinary trends.',
        imageUrl: '/sous-chef.jpg'
    }
];
</script>

<template>
    <section class="text-gray-700 px-4 md:px-4 lg:px-4 xl:px-0">
        <Container class="flex flex-col max-w-6xl mx-auto">
            <div class="mb-16 mt-16 relative">
                <div class="absolute left-1/2 transform h-full w-px bg-blue-200"></div>

                <div class="space-y-24">
                    <div v-for="(point, index) in storyPoints" :key="point.year"
                        class="relative flex items-center justify-center">
                        <div
                            class="absolute w-12 h-12 bg-blue-500 rounded-full text-white flex items-center justify-center z-10 md:left-1/2 md:-translate-x-1/2 left-0 -translate-x-0 top-0 -translate-y-6">
                            {{ point.year }}
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                            <div :class="[index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-2 md:text-left md:pl-12']"
                                class="p-6 bg-white md:bg-transparent rounded-xl shadow-md md:shadow-none flex flex-col justify-center">
                                <h3 class="text-2xl font-bold text-blue-600 mb-3">{{ point.title }}</h3>
                                <p class="text-gray-600 leading-relaxed">{{ point.description }}</p>
                            </div>

                            <div :class="[index % 2 === 0 ? 'md:pl-12' : 'md:order-1 md:pr-12']">
                                <img :src="point.imageUrl" :alt="point.title"
                                    class="w-full h-64 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-16">
                <h2 class="text-3xl font-bold mb-8 text-center text-gray-800">Meet Our Team</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div v-for="member in teamMembers" :key="member.name"
                        class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <img :src="member.imageUrl" :alt="member.name" class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2 text-gray-800">{{ member.name }}</h3>
                            <p class="text-blue-600 mb-3">{{ member.role }}</p>
                            <p class="text-gray-600">{{ member.bio }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </section>
</template>