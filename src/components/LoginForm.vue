<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const emit = defineEmits(['login'])

const email = ref<string>('')
const password = ref<string>('')
const isLoading = ref<boolean>(true)

onMounted(() => {
  isLoading.value = false
})
onBeforeUnmount(() => {
  isLoading.value = true
})

const onSubmit = () => {
  emit('login', email.value, password.value)
}
</script>

<template>
  <transition name="fade">
    <form
      v-if="!isLoading"
      id="form-login"
      @submit.prevent="onSubmit"
      class="py-1 flex flex-col gap-5"
    >
      <fieldset class="flex flex-col gap-3 w-full">
        <label for="username">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          class="bg-white px-4 py-2 text-slate-900 border-slate-900"
          required
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          class="bg-white px-4 py-2 text-slate-900 border-slate-900"
          required
        />
      </fieldset>
      <fieldset class="flex justify-between items-center gap-3">
        <label for="login-remember" class="flex items-center gap-2">
          <input type="checkbox" name="login-remember" id="login-remember" />
          <span class="text-sm opacity-80">Remember me</span>
        </label>
        <a href="/forgot-password" class="text-secondary text-sm">Forgot Password</a>
      </fieldset>
      <fieldset class="">
        <button type="submit" class="px-4 py-2 bg-primary text-light font-bold rounded-md">
          Login
        </button>
      </fieldset>
    </form>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease-in,
    transform 0.3s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 1;
  transform: translateX(100%);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
