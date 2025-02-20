<script setup lang="ts">
const aboutStore = useAboutStore()
await aboutStore.fetchAbout()

usePreloadImage(aboutStore.aboutPageImageUrl?.formats?.large?.url)
usePreloadImage(aboutStore.aboutPageImageUrl?.url)

useSeoMeta({
    title: aboutStore.data?.data.seo?.metaTitle,
    description: aboutStore.data?.data.seo?.metaDescription,
    ogTitle: aboutStore.data?.data.seo?.metaTitle,
    ogDescription: aboutStore.data?.data.seo?.metaDescription,
    ogUrl: aboutStore.data?.data.seo?.ogUrl,
    keywords: aboutStore.data?.data.seo?.keywords
})
</script>

<template>
    <div>
        <PageHero :title="aboutStore.data?.data.aboutPageTitle || 'About Us'"
            :description="aboutStore.data?.data.aboutPageDescription || 'Learn more about our mission and values'"
            :heroImageUrl="aboutStore.aboutPageImageUrl" />
        <AboutSection />
    </div>
</template>