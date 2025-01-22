<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const emit = defineEmits(['register'])

const isLoading = ref<boolean>(true)
const fullname = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const isAcceptTnc = ref<boolean>(false)

onMounted(() => {
  isLoading.value = false
})
onBeforeUnmount(() => {
  isLoading.value = true
})

const handleRegister = () => {
  if (isAcceptTnc.value) {
    emit('register', fullname.value, email.value, password.value)
  }
}
</script>

<template>
  <transition name="fade">
    <form
      v-if="!isLoading"
      id="form-register"
      @submit.prevent="handleRegister"
      class="py-1 flex flex-col gap-5 transition-opacity duration-500"
    >
      <fieldset class="flex flex-col gap-3 w-full">
        <label for="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          v-model="fullname"
          class="bg-white px-4 py-2 text-slate-900 border-slate-900"
          required
        />

        <label for="email">Email</label>
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
      <label for="tnc" class="flex items-center gap-2">
        <input type="checkbox" name="tnc" id="tnc" v-model="isAcceptTnc" required />
        <span class="text-sm opacity-80">I accept VueChef terms & conditions</span>
      </label>
      <fieldset class="">
        <button type="submit" class="px-4 py-2 bg-primary text-light font-bold rounded-md">
          Register
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
  transform: translateX(-100%);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
