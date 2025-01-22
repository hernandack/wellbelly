<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  heading: String,
  caption: String,
  buttonLabel: {
    type: String,
    default: 'Learn More',
  },
  buttonLink: {
    type: String,
    default: '/',
  },
  bgColor: {
    type: String,
    default: 'bg-shade',
  },
})
</script>

<template>
  <section
    :class="`cta w-full py-5 my-2 rounded-xl flex flex-col justify-center items-center gap-4 ${bgColor}`"
  >
    <h2 v-if="props?.heading" class="text-3xl font-bold">{{ props.heading }}</h2>
    <p v-if="props?.caption" class="text-xl">{{ props.caption }}</p>
    <a
      v-if="props?.buttonLabel"
      :href="props.buttonLink"
      class="cta-button px-4 py-2 font-bold button bg-primary text-light hover:bg-secondary hover:text-black"
    >
      {{ props.buttonLabel }}
    </a>
  </section>
</template>
