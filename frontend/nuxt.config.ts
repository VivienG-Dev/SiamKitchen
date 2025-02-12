// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['@nuxt/image', '@pinia/nuxt'],

  runtimeConfig: {
    public: {
      strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337'
    }
  },

  routeRules: {
    '/menu': { swr: 3600 }, // 1 hour
    '/recipes/**': { swr: 43200 }, // 12 hours
    '/about': { swr: 43200 }, // 12 hours
    '/contact': { swr: 86400 }, // 24 hours
  }
})