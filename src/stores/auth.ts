import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AuthUser } from '@/types/Auth'

export const useAuthStore = defineStore('auth', () => {
  // state
  const fullname = ref<string>('')
  const email = ref<string>('')
  const password = ref<string>('')
  const isLoggedIn = ref<boolean>(false)
  const avatar = ref<string>('')
  const user = ref<AuthUser | null>(null)

  // actions
  // login and save auth if success
  const login = (mail: string, pass: string) => {
    email.value = mail
    password.value = pass
    isLoggedIn.value = true

    // store auth in local storage
    localStorage.setItem(
      'Auth',
      JSON.stringify({
        fullname: fullname.value,
        email: email.value,
        password: password.value,
        isLoggedIn: isLoggedIn.value,
        avatar: avatar.value,
        user: user.value,
      }),
    )
  }

  // logout and remove auth
  const logout = () => {
    fullname.value = ''
    email.value = ''
    password.value = ''
    isLoggedIn.value = false
    avatar.value = ''
    user.value = null

    // clear local storage
    localStorage.removeItem('Auth')
  }

  // check the stored auth
  const loadAuth = () => {
    const storedAuth = localStorage.getItem('Auth')
    if (storedAuth) {
      const {
        fullname: name,
        email: mail,
        password: pass,
        isLoggedIn: loggedIn,
        avatar: ava,
        user: usr,
      } = JSON.parse(storedAuth)

      fullname.value = name
      email.value = mail
      password.value = pass
      isLoggedIn.value = loggedIn
      avatar.value = ava
      user.value = usr
    }
  }

  const isAuthLoggedIn = () => {
    if (!isLoggedIn.value && localStorage.getItem('Auth')) {
      return true
    }
    return false
  }

  const setCurrentUser = (data: AuthUser) => {
    user.value = data
  }

  return {
    fullname,
    email,
    password,
    isLoggedIn,
    avatar,
    user,
    login,
    logout,
    loadAuth,
    isAuthLoggedIn,
    setCurrentUser,
  }
})
