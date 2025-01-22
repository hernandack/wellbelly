<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeadingCaptionContainer from './HeadingCaptionContainer.vue'
import RecipeCard from './RecipeCard.vue'
import type { SavedRecipe } from '@/types/Recipe'

const savedRecipes = ref<SavedRecipe[]>([])

const fetchSavedRecipes = async (userId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/saved-recipes/${userId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch saved recipes')
    }
    const data = await response.json()
    savedRecipes.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchSavedRecipes(6)
})
</script>

<template>
  <section class="saved-recipes">
    <HeadingCaptionContainer
      heading="Saved Recipes"
      caption="Your saved recipes will appear here."
    />
    <div class="saved-recipes__list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <template v-if="savedRecipes.length === 0">
        <p class="text-center bg-light text-dark p-5 w-full col-span-full rounded-2xl">
          No saved recipes found
        </p>
      </template>
      <template v-else>
        <RecipeCard
          v-for="recipe in savedRecipes"
          :key="recipe.id"
          :recipe="recipe.recipe"
          :jumboable="false"
        />
      </template>
    </div>
  </section>
</template>
