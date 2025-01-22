<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRecipeStore } from '@/stores/recipe'
import type { Category } from '@/types/Category'

const categories = ref<Category[]>([])
const recipeStore = useRecipeStore()

const fetchCategories = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/categories')
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    const data = await response.json()
    categories.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchCategories()
})

const handleActiveCategory = (id: number) => {
  recipeStore.setActiveCategory(id)
}
</script>

<template>
  <section class="category-menu flex flex-col gap-3">
    <button
      v-for="category in categories"
      :key="category.id"
      :class="`button rounded-xl font-bold border border-light flex gap-2 items-center w-full ${recipeStore.activeCategory === category.id ? 'bg-primary' : ''} hover:bg-primary transition-colors duration-300`"
      @click="handleActiveCategory(category.id)"
    >
      <span class="pi pi-tags"></span>
      <span class="category-menu__label">{{ category.name }}</span>
    </button>
  </section>
</template>
