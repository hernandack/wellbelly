<script setup lang="ts">
import { ref } from 'vue'
import { useRecipeStore } from '@/stores/recipe'

const recipeStore = useRecipeStore()

const sortValue = ref<string>('')

const sortRecipes = () => {
  console.log(sortValue.value)

  if (sortValue.value === 'asc') {
    // sort by latest id (bigger id)
    recipeStore.setSortType('asc')
  } else {
    // sort by oldest id (smaller id)
    recipeStore.setSortType('desc')
  }
}
</script>

<template>
  <div class="sort-recipes">
    <select class="form-input px-2" v-model="sortValue" @change="sortRecipes">
      <option value="asc">Newest</option>
      <option value="desc">Oldest</option>
      <option value="popular">Popularity</option>
    </select>
  </div>
</template>
