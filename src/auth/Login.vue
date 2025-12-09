<script setup lang="ts">
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

const user = reactive({
  email: '',
  password: '',
})

const auth = useAuthStore()

async function submitForm() {
  try {
    await auth.login(user)
  } catch (error) {
    alert('Wrong email or password')
  }
}
</script>
<template>
  <h2 class="mt-50 text-center text-2xl font-bold">Login Form</h2>
  <div class="mx-auto mt-4 max-w-md rounded-lg bg-gray-100 p-8 shadow-lg">
    <form class="space-y-6" @submit.prevent="submitForm">
      <div class="flex items-center space-x-4">
        <label class="w-1/4 font-semibold text-gray-700" for="email">Email</label>
        <input
          id="email"
          class="flex-1 rounded-md border border-gray-300 bg-white p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
          v-model="user.email"
        />
      </div>
      <div class="flex items-center space-x-4">
        <label class="w-1/4 font-semibold text-gray-700" for="password">Password</label>
        <input
          id="password"
          type="password"
          class="flex-1 rounded-md border border-gray-300 bg-white p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          v-model="user.password"
        />
      </div>
      <div class="mt-4 flex flex-col justify-center gap-4">
        <button
          type="submit"
          class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          Login
        </button>
        <div class="flex justify-center text-black">
          <p>
            Already had an account, click
            <router-link class="text-green-600 hover:text-blue-600" to="/register"
              >Register</router-link
            >
          </p>
        </div>
      </div>
    </form>
  </div>
</template>
