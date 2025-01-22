<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboard'
import NavigationBar from '@/components/NavigationBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'

import TableRecipes from '@/components/TableRecipes.vue'
import TabelPanel from '@/components/TabelPanel.vue'
import SavedRecipes from '@/components/SavedRecipes.vue'
import AddRecipe from '@/components/AddRecipe.vue'

const dashboardStore = useDashboardStore()
</script>

<template>
  <main class="bg-dark text-light px-5">
    <NavigationBar />
    <template v-if="dashboardStore.activePanel == '' || dashboardStore.activePanel == 'recipes'">
      <TableRecipes />
    </template>
    <template v-else-if="dashboardStore.activePanel == 'addRecipe'">
      <h2>Add new Recipe</h2>
      <TabelPanel>
        <AddRecipe />
      </TabelPanel>
    </template>
    <template v-else-if="dashboardStore.activePanel == 'myRecipes'">
      <h2>My Recipes</h2>
      <TabelPanel></TabelPanel>
    </template>
    <template v-else-if="dashboardStore.activePanel == 'savedRecipes'">
      <h2>Saved Recipes</h2>
      <TabelPanel>
        <SavedRecipes />
      </TabelPanel>
    </template>
    <template v-else-if="dashboardStore.activePanel == 'profile'">
      <h2>Profile</h2>
      <TabelPanel></TabelPanel>
    </template>
    <SiteFooter />
  </main>
</template>
