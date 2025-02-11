<script setup lang="ts">
const contactPageStore = useContactPageStore()
await contactPageStore.fetchContactPageData()
</script>

<template>
    <div>
        <PageHero :title="contactPageStore.data?.contactPageTitle || 'Get in Touch'"
            :description="contactPageStore.data?.contactPageDescription || 'Contact us for any questions or feedback'"
            :showDietaryGuide="false" :heroImageUrl="contactPageStore.contactPageImageUrl" />
        <ContactSection />
    </div>
</template>