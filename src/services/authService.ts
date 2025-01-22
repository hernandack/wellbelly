import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth'

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    return response.data // { token, user }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response?.data?.message) {
        throw new Error('Error: ' + error.response.data.message)
      }
    } else {
      throw new Error('Error: ' + error)
    }
  }
}

export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password })
    return response.data // { token, user }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response?.data?.message) {
        throw new Error('Error: ' + error.response.data.message)
      }
    } else {
      throw new Error('Error: ' + error)
    }
  }
}
