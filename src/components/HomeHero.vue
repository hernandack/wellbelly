<script setup lang="ts">
import { defineProps } from 'vue'

import NavigationBar from './NavigationBar.vue'

defineProps({
  siteInfo: Object,
})
</script>

<template>
  <NavigationBar />
  <section
    class="home-hero min-h-[70svh] w-full bg-light text-dark flex flex-col justify-center rounded-2xl"
  >
    <div class="container mx-auto text-center flex flex-col gap-4">
      <h1 v-if="siteInfo?.appName" class="text-5xl font-bold">{{ siteInfo?.appName }}</h1>
      <p v-if="siteInfo?.tagline" class="text-2xl italic">{{ siteInfo?.tagline }}</p>
      <p v-if="siteInfo?.description">{{ siteInfo?.description }}</p>
      <div class="flex flex-col md:flex-row gap-4 items-center self-center">
        <a href="/login" class="px-4 py-2 font-bold bg-primary text-black">Login</a>
        <a href="/register" class="px-4 py-2 font-bold bg-secondary text-black">Register</a>
      </div>
    </div>
  </section>
</template>
