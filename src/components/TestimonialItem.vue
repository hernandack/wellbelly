<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  testimonial: Object,
  totalItems: {
    type: Number,
    default: 1,
  },
  itemsPerSlide: {
    type: Number,
    default: 1,
  },
  itemsGap: {
    type: Number,
    default: 10,
  },
})

const itemWidth = computed(() => {
  const totalGap = props.itemsGap * (props.itemsPerSlide - 1)
  return `calc((100% - ${totalGap}px) / ${props.itemsPerSlide})`
})
</script>

<template>
  <article
    class="testimonial-item flex flex-col flex-grow flex-shrink-0 gap-4 p-6 bg-dark text-light shadow-md rounded-lg"
    :style="{ width: itemWidth }"
  >
    <div class="flex flex-col gap-1 justify-center text-center">
      <p class="text-xl text-secondary font-semibold">{{ testimonial?.name }}</p>
      <p class="text-sm text-primary">{{ testimonial?.occupation }}</p>
      <p class="text-sm">{{ testimonial?.country }}</p>
      <p class="text-sm">Member since {{ testimonial?.joinDate }}</p>
    </div>
    <p class="text-sm text-center">{{ testimonial?.reason }}</p>
  </article>
</template>
