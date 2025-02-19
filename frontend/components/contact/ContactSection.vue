<script setup lang="ts">
import { z } from 'zod'

const siteStore = useSiteStore()

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    message: z.string().min(10, 'Message must be at least 10 characters')
})

const formData = ref({
    name: '',
    email: '',
    message: ''
})

const errors = ref<Record<string, string>>({})

const handleSubmit = () => {
    const result = formSchema.safeParse(formData.value)
    if (!result.success) {
        errors.value = Object.fromEntries(
            result.error.errors.map(err => [err.path[0], err.message])
        )
        return
    }

    alert(`Message received!\nFrom: ${formData.value.name}\nEmail: ${formData.value.email}\nMessage: ${formData.value.message}`)

    formData.value = {
        name: '',
        email: '',
        message: ''
    }
    errors.value = {}
}
</script>

<template>
    <section class="text-gray-700 px-4 md:px-4 lg:px-4 xl:px-0">
        <Container class="flex flex-col max-w-6xl mx-auto">
            <div class="flex flex-col md:flex-row gap-12">
                <!-- Contact Form -->
                <div class="w-full md:w-1/2">
                    <div class="bg-white p-8 rounded-xl shadow-md">
                        <form @submit.prevent="handleSubmit" class="space-y-6">
                            <div>
                                <label for="name" class="block mb-2 font-medium">Name</label>
                                <input type="text" id="name" v-model="formData.name" required
                                    class="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    :class="{ 'border-red-500': errors.name }" />
                                <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
                            </div>
                            <div>
                                <label for="email" class="block mb-2 font-medium">Email</label>
                                <input type="email" id="email" v-model="formData.email" required
                                    class="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    :class="{ 'border-red-500': errors.email }" />
                                <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
                            </div>
                            <div>
                                <label for="message" class="block mb-2 font-medium">Message</label>
                                <textarea id="message" v-model="formData.message" required rows="5"
                                    class="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    :class="{ 'border-red-500': errors.message }"></textarea>
                                <p v-if="errors.message" class="mt-1 text-sm text-red-500">{{ errors.message }}</p>
                            </div>
                            <button type="submit"
                                class="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg shadow-sm hover:shadow-md">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Contact Information -->
                <div class="flex flex-col gap-8 w-full md:w-1/2">
                    <div class="bg-white p-6 rounded-xl shadow-md">
                        <div class="flex items-center gap-4 mb-2">
                            <div class="bg-primary/15 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-xl font-semibold mb-2 text-gray-800">Address</h2>
                                <p class="text-gray-600">{{ siteStore.businessLocation }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-md">
                        <div class="flex items-center gap-4 mb-2">
                            <div class="bg-primary/15 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-xl font-semibold mb-2 text-gray-800">Email</h2>
                                <a href="mailto:contact@example.com"
                                    class="text-primary hover:text-primary/90 hover:underline">
                                    {{ siteStore.data?.data.email }}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-md">
                        <div class="flex items-center gap-4 mb-2">
                            <div class="bg-primary/15 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-xl font-semibold mb-2 text-gray-800">Phone</h2>
                                <a href="tel:+1234567890" class="text-primary hover:text-primary/90 hover:underline">
                                    {{ siteStore.data?.data.phoneNumber }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </section>
</template>