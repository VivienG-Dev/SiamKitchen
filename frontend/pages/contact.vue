<script setup lang="ts">
const contactPageStore = useContactPageStore()
await contactPageStore.fetchContactPageData()

usePreloadImage(contactPageStore.contactPageImageUrl)
</script>

<template>
    <div>
        <PageHero :title="contactPageStore.data?.contactPageTitle || 'Get in Touch'"
            :description="contactPageStore.data?.contactPageDescription || 'Contact us for any questions or feedback'"
            :showDietaryGuide="false" :heroImageUrl="contactPageStore.contactPageImageUrl" />
        <ContactSection />
    </div>
</template>