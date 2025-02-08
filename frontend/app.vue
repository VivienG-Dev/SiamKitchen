<script setup lang="ts">
import { useSiteStore } from '~/stores/site'
const siteStore = useSiteStore()
await siteStore.fetchSiteData()
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
