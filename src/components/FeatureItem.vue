<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Feature Title',
  },
  description: {
    type: String,
    default: 'Feature long paragraph description.',
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/150',
  },
  bgColor: {
    type: String,
    default: 'bg-shade',
  },
  textColor: {
    type: String,
    default: 'text-white',
  },
})

const isHovered = ref<boolean>(false)
</script>

<template>
  <article
    :class="`${bgColor} ${textColor} bg-blend-hard-light before:bg-overlay hover:bg-blend-overlay z-[1] feature text-center cursor-default overflow-hidden w-full flex-1 flex flex-col basis-80 min-h-32 aspect-square rounded-2xl relative items-center justify-center gap-4 p-5 bg-cover bg-center bg-no-repeat`"
    :style="{ backgroundImage: `url(${props.thumbnail})` }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <h1 v-if="props.title" class="text-3xl font-bold">{{ props.title }}</h1>
    <transition name="fade-in">
      <p v-if="props.description && isHovered" class="`text-center origin-top">
        {{ props.description }}
      </p>
    </transition>
  </article>
</template>

<style scoped>
.fade-in-enter-active,
.fade-in-leave-active {
  transition:
    opacity 0.5s ease-in-out,
    scale 0.5s ease-in-out;
}
.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
  scale: 0;
}
.fade-in-enter-to,
.fade-in-leave-from {
  opacity: 1;
  scale: 100%;
}
</style>
