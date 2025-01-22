<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCategories } from '@/composables/useCategories'
import { useAuthStore } from '@/stores/auth'
import type { Category } from '@/types/Category'

const name = ref<string>('')
const description = ref<string>('')
const ingredients = ref<string[]>([])
const instructions = ref<string[]>([])
const thumbnail = ref<string>('')
const servings = ref<number>(0)
const cookingTime = ref<number>(0)
const categoryId = ref<number>(0)
const authorId = ref<number | null>(null)
const categories = useCategories()

const authStore = useAuthStore()

const categoryOptions = ref<Category[]>([])

const fetchCategories = async () => {
  try {
    const response = await categories.getCategories()
    categoryOptions.value = response
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchCategories()
  authorId.value = authStore.user?.id as number | null
})

const handleThumbnailChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      thumbnail.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmitRecipe = () => {
  const recipe = {
    name: name.value,
    description: description.value,
    ingredients: ingredients.value,
    instructions: instructions.value,
    thumbnail: thumbnail.value,
    servings: servings.value,
    cookingTime: cookingTime.value,
    categoryId: categoryId.value,
    authorId: authorId.value,
  }
  console.log(recipe)
}
</script>

<template>
  <form class="recipe-form w-full flex flex-col gap-6" @submit.prevent="handleSubmitRecipe">
    <div class="flex flex-col gap-3">
      <label for="recipe-name" class="text-xl font-bold">Name</label>
      <input type="text" name="recipe-name" class="form-input" v-model="name" />
    </div>
    <div class="flex flex-col gap-3">
      <label for="recipe-description" class="text-xl font-bold">Description</label>
      <span class="text-sm text-gray-300">
        Create a brief description of the recipe. Make it compact, interesting, and informative.
      </span>
      <textarea name="recipe-description" class="form-input" v-model="description"></textarea>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <div class="flex flex-col gap-3">
        <label for="recipe-servings" class="text-xl font-bold">Servings</label>
        <span class="text-sm text-gray-300">total serving / person </span>
        <input type="number" name="recipe-servings" class="form-input" v-model="servings" />
      </div>
      <div class="flex flex-col gap-3">
        <label for="recipe-cooking-time" class="text-xl font-bold">Cooking Time</label>
        <span class="text-sm text-gray-300">Cooking time in minutes </span>
        <input type="number" name="recipe-cooking-time" class="form-input" v-model="cookingTime" />
      </div>
      <div class="flex flex-col gap-3">
        <label for="recipe-category" class="text-xl font-bold">Category</label>
        <span class="text-sm text-gray-300">Pick proper single category</span>
        <select name="recipe-category" class="form-input" v-model="categoryId">
          <option v-for="option in categoryOptions" :key="option.id" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <label for="recipe-ingredients" class="text-xl font-bold">Ingredients</label>
      <span class="text-sm text-gray-300">
        Separate each ingredient by "Enter" to create multiple ingredients. Use ":" symbol to add
        measurement (ex: Salt : 2 Tablespoon)
      </span>
      <input name="recipe-ingredients" class="form-input" v-model="ingredients" />
    </div>
    <div class="flex flex-col gap-3">
      <label for="recipe-instructions" class="text-xl font-bold">Instructions</label>
      <span class="text-sm text-gray-300">
        Separate each instruction by "Enter" to create multiple steps.
      </span>
      <input type="text" name="recipe-instructions" class="form-input" v-model="instructions" />
    </div>
    <div class="flex flex-col gap-3">
      <label for="recipe-image" class="text-xl font-bold">Thumbnail</label>
      <span class="text-sm text-gray-300">
        Please use jpg, jpeg, or webp format. Minimum size is 160x160 pixels. Maximum file size is
        2MB.
      </span>
      <input type="file" name="recipe-image" class="form-input" @change="handleThumbnailChange" />
    </div>
    <div class="flex flex-col gap-3">
      <input type="hidden" name="recipe-author" class="form-input" v-model="authorId" />
    </div>
    <div class="flex justify-end gap-3">
      <button
        type="submit"
        class="btn-primary px-5 py-2 bg-primary rounded-3xl hover:bg-secondary hover:text-black transition-colors"
      >
        Submit
      </button>
    </div>
  </form>
</template>
