<script setup lang="ts">
import { ref } from 'vue'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import CategoryMenu from './CategoryMenu.vue'
import RecipesList from './RecipesList.vue'
import EditorMenu from './EditorMenu.vue'

const sortType = ref<string>('')
const activeCategory = ref<string>('')

const handleSortRecipe = (type: string) => {
  sortType.value = type
  console.log('tableRecipes', sortType.value, type)
}

const handleActiveCategory = (category: string) => {
  activeCategory.value = category
}
</script>

<template>
  <section class="table-recipes">
    <TableHeader @sort-recipes="handleSortRecipe" />
    <TableBody>
      <div class="table-recipes__menus flex flex-col gap-8 sticky top-0">
        <EditorMenu />
        <CategoryMenu @active-category="handleActiveCategory" />
      </div>
      <RecipesList :sort="sortType" :active-category="activeCategory" />
    </TableBody>
  </section>
</template>
