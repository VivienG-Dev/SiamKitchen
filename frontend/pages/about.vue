<script setup lang="ts">
const aboutStore = useAboutStore()
await aboutStore.fetchAbout()

usePreloadImage(aboutStore.aboutPageImageUrl)
</script>

<template>
    <div>
        <PageHero title="About Us" description="Learn more about our mission and values" :showDietaryGuide="false"
            :heroImageUrl="aboutStore.aboutPageImageUrl" />
        <AboutSection />
    </div>
</template>