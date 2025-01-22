import axios from 'axios'
import type { Category } from '@/types/Category'

const API_URL = 'http://localhost:3000/api/categories'

export const useCategories = () => {
  const getCategories = async (): Promise<Category[]> => {
    try {
      const response = await axios.get(API_URL)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response?.data?.message) {
          throw new Error('Error: ' + error.response.data.message)
        }
      } else {
        throw new Error('Error: ' + error)
      }
      return []
    }
  }

  return {
    getCategories,
  }
}
