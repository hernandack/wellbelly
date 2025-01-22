<script setup lang="ts">
import { ref } from 'vue'
import FeatureItem from './FeatureItem.vue'
import featuresData from '@/mockup/site.json'

interface Feature {
  id: string
  title: string
  description: string
  thumbnail?: string
}

const features = ref<Feature[]>(Object.values(featuresData.features))
</script>

<template>
  <section class="features-list w-full flex flex-row gap-2 flex-wrap">
    <FeatureItem
      v-for="feature in features"
      :key="feature.id"
      :title="feature?.title"
      :description="feature?.description"
      :thumbnail="feature?.thumbnail"
      bgColor="bg-shade"
    />
  </section>
</template>
