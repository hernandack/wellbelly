export type RecipeContent = {
  ingredients: string[]
  utensils?: string[]
  steps: string[]
}

export type RecipeAuthor = {
  id: number
  name: string
  avatar?: string
  username?: string
}

export type RecipeIngredient = {
  name: string
  quantity?: string
}

export type RecipeInstruction = {
  description: string
  image?: string
}

export type Recipe = {
  id: number
  title: string
  description: string
  author: RecipeAuthor
  servings: number
  content: RecipeContent
  ingredients: RecipeIngredient[]
  instructions: RecipeInstruction[]
  createdAt?: string
  thumbnail?: string
  cookingTime?: number
  isJumbo?: boolean
  bgColor?: string
}

export type SavedRecipe = {
  id: number
  userId: number
  recipeId: number
  createdAt?: string
  updateAt?: string
  recipe: Recipe | null
}
