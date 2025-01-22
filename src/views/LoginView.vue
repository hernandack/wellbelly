<script setup lang="ts">
import { defineProps, ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthApi } from '@/composables/useAuthApi'
import { useAuthStore } from '@/stores/auth'

import LoginForm from '@/components/LoginForm.vue'
import HeadingCaptionContainer from '@/components/HeadingCaptionContainer.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import ExternalAuth from '@/components/ExternalAuth.vue'
import BorderSeparator from '@/components/BorderSeparator.vue'
import router from '@/router'

const props = defineProps({
  panelActive: {
    type: String,
    default: 'login',
  },
})

const { auth, login, register } = useAuthApi()
const authStore = useAuthStore()

onBeforeMount(() => {
  const authenticated = authStore.isLoggedIn
  if (authenticated) {
    const router = useRouter()
    router.push({ name: 'dashboard' })
  }
})

const panelActive = ref<string>(props.panelActive)

const togglePanel = (panel: 'login' | 'register') => {
  if (panel) {
    panelActive.value = panel
  }
}

const isLoginPanel = computed(() => {
  return panelActive.value == 'login' ? true : false
})

const handleLogin = async (email: string, password: string) => {
  try {
    await login(email, password)
  } catch (error) {
    console.error(error)
  }
}

const handleRegister = async (fullname: string, email: string, password: string) => {
  try {
    await register(fullname, email, password)
    togglePanel('login')
    router.push({ name: 'dashboard' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <section
    class="min-h-svh grid grid-cols-1 md:grid-cols-2 lg:grid-cols-60/40 p-3 bg-dark text-light"
  >
    <figure class="w-full flex flex-col items-center justify-center overflow-hidden rounded-xl">
      <img src="@/assets/img/login.jpg" alt="Login" class="object-cover w-full h-full" />
    </figure>
    <section class="form-panel flex flex-col w-full gap-3 px-10">
      <div
        class="form-panel__toggle flex items-center justify-center bg-shade p-2 w-max self-center rounded-2xl"
      >
        <button
          :class="`py-2 px-5 ${isLoginPanel ? 'bg-primary text-light' : 'bg-shade text-light '} font-bold rounded-xl transition-colors duration-300`"
          @click="togglePanel('login')"
        >
          Login
        </button>
        <button
          :class="`py-2 px-5 ${!isLoginPanel ? 'bg-primary text-light' : 'bg-shade text-light '} font-bold rounded-xl transition-colors duration-300`"
          @click="togglePanel('register')"
        >
          Register
        </button>
      </div>
      <HeadingCaptionContainer
        v-if="isLoginPanel"
        heading="Log in to your account"
        caption="Welcome back! Select log in method:"
        class="h-full flex flex-col justify-center p-5 md:p-6 lg:p-10 overflow-hidden"
      >
        <ExternalAuth />
        <BorderSeparator />
        <LoginForm @login="handleLogin" />
      </HeadingCaptionContainer>
      <HeadingCaptionContainer
        v-else
        heading="Register new account"
        caption="Welcome! Select register method:"
        class="h-full flex flex-col justify-center p-5 md:p-6 lg:p-10 overflow-hidden"
      >
        <ExternalAuth />
        <BorderSeparator />
        <RegisterForm @register="handleRegister" />
      </HeadingCaptionContainer>
    </section>
  </section>
</template>
