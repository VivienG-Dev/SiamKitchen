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

  modules: ['@nuxt/image', '@pinia/nuxt', '@nuxtjs/google-fonts'],

  runtimeConfig: {
    public: {
      strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337'
    }
  },

  googleFonts: {
    families: {
      Nunito: true,
      'Playfair+Display': true
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
    useStylesheet: true
  }
})