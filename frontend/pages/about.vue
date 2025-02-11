<script setup lang="ts">
const aboutStore = useAboutStore()
await aboutStore.fetchAbout()

useHead(() => ({
    link: aboutStore.aboutPageImageUrl ? [{ rel: 'preload', href: aboutStore.aboutPageImageUrl, as: 'image' }] : []
}))
</script>

<template>
    <div>
        <PageHero title="About Us" description="Learn more about our mission and values" :showDietaryGuide="false"
            :heroImageUrl="aboutStore.aboutPageImageUrl" />
        <AboutSection />
    </div>
</template>