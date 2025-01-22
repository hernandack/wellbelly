<script setup lang="ts">
import { ref } from 'vue'
import { useRecipeStore } from '@/stores/recipe'
import { useDashboardStore } from '@/stores/dashboard'

const emit = defineEmits(['active-editor-menu'])
const recipeStore = useRecipeStore()
const dashboardStore = useDashboardStore()

const editorMenu = [
  {
    label: 'Add Recipe',
    icon: 'pi pi-file-plus',
    value: 'addRecipe',
  },
  {
    label: 'My Recipes',
    icon: 'pi pi-book',
    value: 'myRecipes',
  },
  {
    label: 'Saved Recipes',
    icon: 'pi pi-list-check',
    value: 'savedRecipes',
  },
]

const activeEditorMenu = ref<string>('')

const handleActiveEditorMenu = (id: string) => {
  activeEditorMenu.value = id
  emit('active-editor-menu', activeEditorMenu.value)
  recipeStore.activeCategory = 0
  dashboardStore.activePanel = id
}
</script>

<template>
  <section class="editor-menu flex flex-col gap-3 sticky top5">
    <button
      v-for="(menu, index) in editorMenu"
      :key="index"
      :class="`button rounded-xl font-bold flex gap-2 items-center w-full ${activeEditorMenu === menu.label ? 'bg-primary' : ''} hover:bg-primary transition-colors duration-300`"
      @click="handleActiveEditorMenu(menu.value)"
    >
      <span v-if="menu.icon" :class="menu.icon"></span>
      <span v-if="menu.label" class="category-menu__label">{{ menu.label }}</span>
    </button>
  </section>
</template>
