<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from 'vue'
import testimonialData from '@/mockup/testimonials.json'
import TestimonialItem from './TestimonialItem.vue'

import type { Testimonial } from '@/types/Testimonial'

const props = defineProps({
  bgColor: {
    type: String,
    default: 'bg-transparent',
  },
  rounded: {
    type: String,
    default: 'false',
  },
})

const testimonials = ref<Testimonial[]>(testimonialData.testimonials)
const slider = ref<HTMLDivElement | null>(null)
const sliderContainer = ref<HTMLDivElement | null>(null)
const sliderWidth = ref<number>(0)
const itemsPerSlide = 3
const slidesCount = ref<number>(Math.ceil(testimonials.value.length / itemsPerSlide))
const itemsGap = 20
const currentSlide = ref<number>(0)

{
  /* hook */
}
onMounted(() => {
  if (slider.value && sliderContainer.value) {
    sliderWidth.value = sliderContainer.value.getBoundingClientRect().width
  }
})

{
  /* slide prev or next */
}
const slideTo = (direction: 'prev' | 'next') => {
  if (direction === 'prev') {
    if (currentSlide.value > 0) currentSlide.value -= 1
  } else if (direction === 'next') {
    if (currentSlide.value < slidesCount.value - 1) currentSlide.value += 1
  }
}

const sliderTransform = computed(() => {
  return `translateX(${sliderWidth.value * -currentSlide.value}px)`
})
</script>

<template>
  <section
    :class="`${props.bgColor} ${props.rounded === 'true' ? 'rounded-2xl' : ''} testimonial-list flex flex-shrink-0 py-20 relative overflow-hidden`"
  >
    <div ref="slider" class="slider w-full flex py-3 overflow-x-hidden">
      <div
        ref="sliderContainer"
        class="slider-container w-full flex gap-[20px] transition-transform duration-300 ease-in-out"
        :data-width="sliderWidth"
        :style="{ transform: `${sliderTransform}` }"
      >
        <TestimonialItem
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          :testimonial="testimonial"
          :totalItems="testimonials.length"
          :itemsPerSlide="itemsPerSlide"
          :itemsGap="itemsGap"
        />
      </div>
    </div>
    <div class="slider-nav absolute top-5 left-0 flex justify-between z-10 w-full">
      <button
        @click="slideTo('prev')"
        class="prev bg-shade text-light font-bold p-4 opacity-50 hover:opacity-75"
      >
        Prev
      </button>
      <button
        @click="slideTo('next')"
        class="next bg-shade text-light font-bold p-4 opacity-50 hover:opacity-75"
      >
        Next
      </button>
    </div>
  </section>
</template>
