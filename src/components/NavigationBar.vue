<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthApi } from '@/composables/useAuthApi'
import logo from '@/assets/logo.svg'

const { auth, logout, isAuthLoggedIn } = useAuthApi()

const handleLogout = () => {
  logout()
}
</script>

<template>
  <header class="site-header sticky z-50 top-0 left-0 w-full bg-dark text-light">
    <div class="container w-full mx-auto p-5 flex items-center justify-between">
      <RouterLink to="/">
        <img :src="logo" alt="Logo" class="h-10" />
      </RouterLink>
      <menu class="flex flex-col md:flex-row gap-8">
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="#testimonials">Testimonials</RouterLink>
        </li>
        <li>
          <RouterLink to="#features">Features</RouterLink>
        </li>
      </menu>
      <menu v-if="!isAuthLoggedIn()" class="flex flex-col md:flex-row gap-8">
        <li>
          <RouterLink to="/dashboard" class="button-primary">Dashboard</RouterLink>
        </li>
        <li>
          <button @click="handleLogout" class="button button-secondary">Logout</button>
        </li>
        <li>
          <RouterLink to="/profile">{{ auth.name }}</RouterLink>
        </li>
      </menu>
      <menu v-else class="flex flex-col md:flex-row gap-8">
        <li>
          <RouterLink to="/login" class="button-primary">Login</RouterLink>
        </li>
        <li>
          <RouterLink to="/login">Register</RouterLink>
        </li>
      </menu>
    </div>
  </header>
</template>

<style scoped>
menu > li {
  display: inline-flex;
}
</style>
