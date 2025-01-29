<script setup lang="ts">
import { CookingPot } from 'lucide-vue-next';
</script>

<template>
    <div>
        <section
            class="bg-gradient-to-br from-blue-400 via-blue-300 to-green-300 text-white p-4 m-4 h-[20rem] rounded-4xl">
            <Container class="flex flex-col items-center justify-center h-full">
                <div class="flex flex-col items-center">
                    <h1 class="text-3xl md:text-4xl font-bold">Our menu</h1>
                    <p class="text-lg md:text-2xl">Explore our wide range of dishes, from classic favorites to
                        innovative creations.</p>
                </div>
            </Container>
        </section>

        <section class="text-black px-4 md:px-0 h-auto">
            <Container class="flex flex-col gap-10">
                <div class="flex flex-col py-8">
                    <h2 class="text-xl md:text-3xl font-bold text-center">Breakfast</h2>
                    <p class="text-sm md:text-lg text-center">Our breakfast menu is available from 7:00 AM to 10:00
                        AM.</p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <Card
                            class="flex flex-row bg-white p-2 shadow-sm hover:shadow-lg rounded-xl transition-shadow duration-300 hover:shadow-blue-300/50 h-36">
                            <NuxtImg src="../public/pad-thai.jpg" alt="Pad Thai"
                                class="flex flex-1 rounded-xl w-full h-auto object-cover" />
                            <div class="flex flex-col justify-center flex-2 gap-2 backdrop-blur-sm p-4 rounded-xl">
                                <CardHeader class="flex flex-row justify-between">
                                    <CardTitle>Pad Thai</CardTitle>
                                    <span class="text-lg text-green-500 font-medium">
                                        $10
                                    </span>
                                </CardHeader>
                                <CardContent>
                                    <p class="text-md">A popular Thai dish made with stir-fried noodles, vegetables,
                                        and
                                        a flavorful sauce.</p>
                                </CardContent>
                            </div>
                        </Card>
                        <Card
                            class="flex flex-row bg-white p-2 shadow-sm hover:shadow-lg rounded-xl transition-shadow duration-300 hover:shadow-blue-300/50 h-36">
                            <NuxtImg src="../public/pad-thai.jpg" alt="Pad Thai"
                                class="flex flex-1 rounded-xl w-full h-auto object-cover" />
                            <div class="flex flex-col justify-center flex-2 gap-2 backdrop-blur-sm p-4 rounded-xl">
                                <CardHeader>
                                    <CardTitle>Pad Thai</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p class="text-md">A popular Thai dish made with stir-fried noodles, vegetables,
                                        and
                                        a flavorful sauce.</p>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </div>

                <div class="flex flex-col py-8">
                    <h2 class="text-xl md:text-2xl font-bold text-center">Lunch</h2>
                    <p class="text-lg md:text-2xl text-center">Our lunch menu is available from 11:00 AM to 3:00 PM.</p>

                    <div class="flex justify-center items-center mt-4">
                        <div class="text-center bg-gray-300 rounded-xl py-4 px-8">
                            <CookingPot class="w-12 h-12 mx-auto mb-4" />
                            <p class="text-lg">No lunch items available at the moment</p>
                            <p class="text-sm">Please check back later for our updated menu</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 class="text-xl md:text-2xl font-bold text-center">Dinner</h2>
                    <p class="text-lg md:text-2xl text-center">Our dinner menu is available from 5:00 PM to 10:00 PM.
                    </p>
                </div>

                <div>
                    <h2 class="text-xl md:text-2xl font-bold text-center">Drinks</h2>
                    <p class="text-lg md:text-2xl text-center">Our drinks menu is available from 11:00 AM to 10:00 PM.
                    </p>
                </div>

                <div>
                    <h2 class="text-xl md:text-2xl font-bold text-center">Desserts</h2>
                    <p class="text-lg md:text-2xl text-center">Our dessert menu is available from 11:00 AM to 10:00 PM.
                    </p>
                </div>
            </Container>
        </section>
    </div>
</template>