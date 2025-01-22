import { ref } from 'vue'
import { login as loginService, register as registerService } from '@/services/authService'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useAuthApi = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  const auth = ref({
    name: '',
    email: '',
    password: '',
    isLoggedIn: false,
    token: '',
    user: null,
  })

  const login = async (email: string, password: string) => {
    try {
      const data = await loginService(email, password)
      auth.value.token = data.token
      auth.value.user = data.user
      auth.value.isLoggedIn = true
      if (localStorage.getItem('auth')) {
        authStore.logout()
      } else {
        authStore.login(email, password)
        fetchCurrentUser(email)
        router.push({ name: 'dashboard' })
      }
    } catch (error) {
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const data = await registerService(name, email, password)
      auth.value.user = data.user
      auth.value.isLoggedIn = true
      if (localStorage.getItem('auth')) {
        authStore.logout()
      } else {
        authStore.login(email, password)
        router.push({ name: 'login' })
      }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    auth.value.token = ''
    auth.value.user = null
    auth.value.isLoggedIn = false
    authStore.logout()
    router.push({ name: 'login' })
  }

  const isAuthLoggedIn = () => {
    return auth.value.isLoggedIn
  }

  const fetchCurrentUser = async (email: string) => {
    try {
      console.log('token: ', auth.value.token)
      console.log('email: ', email)
      const response = await axios.get(`http://localhost:3000/api/auth/me/${email}`, {
        headers: { Authorization: `Bearer ${auth.value.token}` },
      })
      auth.value.name = response.data.name
      auth.value.email = response.data.email
      auth.value.isLoggedIn = true
      auth.value.user = response.data
      localStorage.setItem('Auth', JSON.stringify(auth.value))
      authStore.setCurrentUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    auth,
    login,
    register,
    logout,
    isAuthLoggedIn,
    fetchCurrentUser,
  }
}
