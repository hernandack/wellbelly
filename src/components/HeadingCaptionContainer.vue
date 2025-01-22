<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  heading: String,
  caption: String,
})
</script>

<template>
  <section class="flex flex-col gap-2">
    <h2 v-if="heading" class="text-2xl font-bold">{{ heading }}</h2>
    <p v-if="caption" class="text-xl">{{ caption }}</p>
    <slot></slot>
  </section>
</template>
