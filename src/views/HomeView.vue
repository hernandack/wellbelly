<script setup lang="ts">
import { ref } from 'vue'
import HomeHero from '../components/HomeHero.vue'
import TestimonialList from '@/components/TestimonialList.vue'
import BoxBanner from '@/components/BoxBanner.vue'
import FeaturesList from '@/components/FeaturesList.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import CallToAction from '@/components/CallToAction.vue'

import siteData from '@/mockup/site.json'

const siteInfo = ref<object>(siteData)
</script>

<template>
  <main class="bg-dark text-light px-5">
    <HomeHero :site-info="siteInfo" />
    <section id="testimonials" class="w-full py-3 grid grid-cols-20/80 gap-3">
      <BoxBanner
        heading="Why Join?"
        caption="Not only you can learn from others, you can express your own recipes with our wonderful community!"
      />
      <TestimonialList bgColor="bg-white" rounded="true" />
    </section>
    <FeaturesList id="features" />
    <CallToAction
      heading="Ready to Join?"
      caption="Join our community today!"
      buttonLabel="Open App"
      buttonLink="/dashboard"
    />
    <SiteFooter />
  </main>
</template>
