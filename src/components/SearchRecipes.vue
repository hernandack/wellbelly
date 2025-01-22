<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search recipes...',
  },
  searchValue: {
    type: String,
    default: '',
  },
})

const searchKeywords = ref<string>(props.searchValue)

watch(
  () => props.searchValue,
  (newValue) => {
    searchKeywords.value = newValue
  },
)
</script>

<template>
  <form class="search-recipes w-full">
    <input
      type="text"
      name="search-value"
      class="form-input"
      :placeholder="props.placeholder"
      v-model="searchKeywords"
    />
  </form>
</template>
