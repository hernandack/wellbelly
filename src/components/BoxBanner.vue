<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  heading: {
    type: String,
    default: 'Box Banner',
  },
  caption: {
    type: String,
    default: 'This is a simple box banner component',
  },
})
</script>

<template>
  <article
    class="w-full h-full flex flex-col items-center justify-center gap-3 bg-primary text-white font-bold p-5 rounded-2xl"
  >
    <h1 v-if="props.heading" class="text-4xl font-bold text-center">{{ props.heading }}</h1>
    <p v-if="props.caption" class="text-center">{{ props.caption }}</p>
  </article>
</template>
