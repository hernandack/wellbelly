<script setup lang="ts">
import { ref } from 'vue'
import SortRecipes from './SortRecipes.vue'
import SearchRecipes from './SearchRecipes.vue'

const emit = defineEmits(['sort-recipes'])

const sortType = ref<string>('')

const handleSortRecipes = () => {
  console.log(sortType)
  emit('sort-recipes', sortType.value)
}
</script>

<template>
  <section class="table-header flex w-full gap-6 items-center py-4 px-5">
    <div class="table-brand font-bold text-3xl">VueChef</div>
    <SearchRecipes />
    <SortRecipes @sort-recipes="handleSortRecipes" />
  </section>
</template>
