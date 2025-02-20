<script setup lang="ts">
const contactPageStore = useContactPageStore()
await contactPageStore.fetchContactPageData()

usePreloadImage(contactPageStore.contactPageImageUrl?.formats?.large?.url)
usePreloadImage(contactPageStore.contactPageImageUrl?.url)

useSeoMeta({
    title: contactPageStore.data?.seo?.metaTitle,
    description: contactPageStore.data?.seo?.metaDescription,
    ogTitle: contactPageStore.data?.seo?.metaTitle,
    ogDescription: contactPageStore.data?.seo?.metaDescription,
    ogUrl: contactPageStore.data?.seo?.canonicalURL,
    keywords: contactPageStore.data?.seo?.keywords
})
</script>

<template>
    <div>
        <PageHero :title="contactPageStore.data?.contactPageTitle || 'Get in Touch'"
            :description="contactPageStore.data?.contactPageDescription || 'Contact us for any questions or feedback'"
            :heroImageUrl="contactPageStore.contactPageImageUrl" />
        <ContactSection />
    </div>
</template>