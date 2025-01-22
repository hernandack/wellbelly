import { ref } from 'vue'
import { defineStore } from 'pinia'

const activePanel = ref<string>('')

export const useDashboardStore = defineStore('dashboard', () => {
  const setActivePanel = (panel: string) => {
    activePanel.value = panel
  }

  return {
    activePanel,
    setActivePanel,
  }
})
