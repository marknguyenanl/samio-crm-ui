<script setup lang="ts">
import { reactive } from 'vue'
import { registerAPI } from '@/api/auth'
import { useRouter } from 'vue-router'

const user = reactive({
  email: '',
  password: '',
})
const router = useRouter()

async function submitForm() {
  const status = await registerAPI(user)
  if (status === 201) {
    router.push({ name: 'login' })
  }
}
// todo: add user-role for feat/user-authentication
</script>
<template>
  <h2 class="mt-50 text-center text-2xl font-bold">Register Form</h2>
  <div class="mx-auto mt-4 max-w-md rounded-lg border border-yellow-100 bg-green-100 p-8 shadow-lg">
    <form class="space-y-6" @submit.prevent="submitForm">
      <div class="flex flex-row items-center space-x-4">
        <label class="w-1/4 font-semibold text-gray-700" for="email">Email </label>
        <input
          id="email"
          class="flex-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          v-model="user.email"
        />
      </div>
      <div class="flex w-full flex-col gap-4">
        <div class="flex flex-row items-center space-x-4">
          <label class="w-1/4 font-semibold text-gray-700" for="password">Password</label>
          <input
            id="password"
            type="password"
            class="flex-1 rounded-md border border-gray-300 bg-gray-50 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            v-model="user.password"
          />
        </div>
        <!-- Notification -->
        <p
          v-if="user.password && user.password.length < 8"
          class="mt-1 w-full text-sm text-red-500"
        >
          Password must be at least 8 characters long!
        </p>
      </div>
      <div class="mt-4 flex flex-col justify-center gap-4">
        <button
          type="submit"
          class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          Register
        </button>
        <div class="flex justify-center text-black">
          <p>
            Don't have an account, click
            <router-link class="text-green-600 hover:text-blue-600" to="/login">Login</router-link>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>
