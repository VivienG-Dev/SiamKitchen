<script setup lang="ts">
import { useSiteStore } from '~/stores/site'
const siteStore = useSiteStore()
await siteStore.fetchSiteData()

useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Nunito:ital@0;1&family=Playfair+Display:wght@500&display=swap'
    }
  ]
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <TheNavbar />
      <NuxtPage />
      <TheFooter />
    </NuxtLayout>
  </div>
</template>
