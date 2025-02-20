<script setup lang="ts">
import { useSiteStore } from '~/stores/site'
const siteStore = useSiteStore()
await siteStore.fetchSiteData()

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'robots',
      content: 'index, follow'
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
