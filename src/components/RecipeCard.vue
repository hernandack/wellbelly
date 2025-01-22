<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRecipeStore } from '@/stores/recipe'
import type { Recipe } from '@/types/Recipe'

const props = defineProps<{ recipe: Recipe; jumboable?: boolean }>()
const recipeStore = useRecipeStore()
const jumboIndexes = ref<number[]>([1, 7])

watch(
  () => recipeStore.sortType,
  () => {
    jumboIndexes.value = recipeStore.sortType === 'asc' ? [1, 7] : [9, 3]
  },
)
</script>

<template>
  <article
    :class="`recipe rounded-xl bg-shade text-light ${props.recipe?.isJumbo || (props.recipe?.id !== undefined && jumboIndexes.includes(props.recipe.id)) ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`"
  >
    <div
      v-if="
        (props.recipe?.isJumbo && props.jumboable) ||
        (Array.from(jumboIndexes).includes(props.recipe?.id) && props.jumboable)
      "
      class="grid grid-cols-1 md:grid-cols-2 gap-5 h-full"
    >
      <figure>
        <img
          v-if="props.recipe?.thumbnail"
          :src="props.recipe?.thumbnail"
          :alt="props.recipe?.title"
          class="aspect-video object-cover w-full h-full"
        />
        <img
          v-else
          src="https://placehold.co/400x400?font=roboto"
          :alt="props.recipe?.title"
          class="aspect-video object-cover w-full h-full"
        />
      </figure>
      <div class="flex flex-col gap-3 p-5">
        <h3 v-if="props.recipe?.title" class="text-2xl font-bold text-secondary">
          {{ props.recipe?.title }}
        </h3>
        <p v-if="props.recipe?.description">{{ props.recipe?.description }}</p>
        <div class="flex gap-3 text-sm">
          <div v-if="props.recipe?.servings" class="flex flex-col">
            <span class="opacity-80">Serving</span>
            <span class="font-bold">{{ props.recipe?.servings }}</span>
          </div>
          <div v-if="props.recipe?.cookingTime" class="flex flex-col">
            <span class="opacity-80">Cooking Time</span>
            <span class="font-bold">{{ props.recipe?.cookingTime }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="relative">
      <figure
        class="absolute right-[97%] top-1/2 -translate-y-1/2 translate-x-[60%] w-20 h-20 col-span-1 row-span-1"
      >
        <img
          v-if="props.recipe?.thumbnail"
          :src="props.recipe?.thumbnail"
          :alt="props.recipe?.title"
          class="aspect-square object-cover rounded-full overflow-hidden"
        />
        <img
          v-else
          src="https://placehold.co/400x400?font=roboto"
          :alt="props.recipe?.title"
          class="aspect-square object-cover rounded-full overflow-hidden"
        />
      </figure>
      <div class="flex flex-col gap-3 pl-20 p-5">
        <h3 v-if="props.recipe?.title" class="text-2xl font-bold text-secondary">
          {{ props.recipe?.title }}
        </h3>
        <p v-if="props.recipe?.author.name" class="text-sm flex items-center gap-1">
          <span class="opacity-80">By</span>
          <span class="font-bold">{{ props.recipe?.author.name }}</span>
        </p>
        <div class="flex gap-6 text-sm">
          <div v-if="props.recipe?.servings" class="flex flex-col">
            <span class="opacity-80">Serving</span>
            <span class="font-bold">{{ props.recipe?.servings }}</span>
          </div>
          <div v-if="props.recipe?.cookingTime" class="flex flex-col">
            <span class="opacity-80">Cooking Time</span>
            <span class="font-bold">{{ props.recipe?.cookingTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
