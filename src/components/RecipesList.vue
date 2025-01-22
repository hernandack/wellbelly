<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import RecipeCard from './RecipeCard.vue'
import { useRecipeStore } from '@/stores/recipe'
import type { Recipe } from '@/types/Recipe'

const recipes = ref<Recipe[]>([])
const recipeStore = useRecipeStore()

const fetchRecipes = async () => {
  const fetchUrl =
    recipeStore.activeCategory && recipeStore.activeCategory !== 0
      ? `http://localhost:3000/api/recipes/category/${recipeStore.activeCategory}`
      : 'http://localhost:3000/api/recipes/details'
  try {
    const response = await fetch(fetchUrl)
    const data = await response.json()
    recipes.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchRecipes()
})

watch(
  () => recipeStore.activeCategory,
  () => {
    fetchRecipes()
  },
)

const sortedRecipes = computed(() => {
  const sorted = [...recipes.value]
  if (recipeStore.sortType === 'asc') {
    return sorted.sort((a, b) => a.id - b.id) // Numeric comparison for ascending order
  } else if (recipeStore.sortType === 'desc') {
    return sorted.sort((a, b) => b.id - a.id) // Numeric comparison for descending order
  }
  return sorted
})
</script>

<template>
  <section class="recipes-list">
    <div
      class="recipes-list__container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-8"
    >
      <template v-if="sortedRecipes.length === 0">
        <p class="text-center bg-light text-dark p-5 w-full col-span-full rounded-2xl">
          No recipes found
        </p>
      </template>
      <template v-else>
        <RecipeCard v-for="recipe in sortedRecipes" :key="recipe.id" :recipe="recipe" />
      </template>
    </div>
  </section>
</template>
