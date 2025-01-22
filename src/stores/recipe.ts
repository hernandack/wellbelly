import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Recipe } from '../types/Recipe'

export const useRecipeStore = defineStore('recipe', () => {
  // state
  const recipes = ref<Recipe[]>([])
  const activeCategory = ref<number>(0)
  const sortType = ref<string>('')

  // actions
  const addRecipe = (recipe: Recipe) => {
    recipes.value.push(recipe)
  }

  const setActiveCategory = (category: number) => {
    activeCategory.value = category
  }

  const setSortType = (type: string) => {
    sortType.value = type
  }

  return {
    recipes,
    activeCategory,
    sortType,
    addRecipe,
    setActiveCategory,
    setSortType,
  }
})
