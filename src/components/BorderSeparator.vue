<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: 'OR',
  },
})
</script>

<template>
  <div
    v-if="props.label"
    class="separator flex items-center justify-center gap-3 before:h-1 before:bg-white before:bg-opacity-50 before:w-full after:h-1 after:bg-white after:w-full after:bg-opacity-50"
  >
    {{ props.label }}
  </div>
</template>
