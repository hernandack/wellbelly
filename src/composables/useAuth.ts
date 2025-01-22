import { ref, watch } from 'vue'

export const useAuth = () => {
  // default auth
  const defaultAuth = {
    username: '',
    password: '',
    isLoggedIn: false,
  }

  // get local storage
  const storedAuth = localStorage.getItem('auth')
  // set the AUTH, if stored exist and correct, use it, otherwise use empty default
  const auth = ref(storedAuth ? JSON.parse(storedAuth) : defaultAuth)

  // update localStorage Auth when dependencies changes
  watch(
    auth,
    (newAuth) => {
      localStorage.setItem('auth', JSON.stringify(newAuth))
    },
    { deep: true },
  )

  // login
  const login = (username: string, password: string) => {
    if (username === 'guest' && password === 'password') {
      auth.value = {
        username,
        password,
        isLoggedIn: true,
      }
    } else {
      auth.value = defaultAuth
    }
  }

  // reset on logout
  const logout = () => {
    auth.value = defaultAuth
  }

  return {
    auth,
    login,
    logout,
  }
}
