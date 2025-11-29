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
  <h2 class="font-bold text-center text-2xl mt-50">Register Form</h2>
  <div class="border-yellow-100 border mt-4 max-w-md mx-auto bg-green-100 p-8 rounded-lg shadow-lg">
    <form class="space-y-6" @submit.prevent="submitForm">
      <div class="flex flex-row items-center space-x-4">
        <label class="w-1/4 font-semibold text-gray-700" for="email">Email </label>
        <input
          id="email"
          class="bg-gray-50 flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="user.email"
        />
      </div>
      <div class="flex flex-col gap-4 w-full">
        <div class="flex flex-row items-center space-x-4">
          <label class="w-1/4 font-semibold text-gray-700" for="password">Password</label>
          <input
            id="password"
            type="password"
            class="bg-gray-50 flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="user.password"
          />
        </div>
        <!-- Notification -->
        <p
          v-if="user.password && user.password.length < 8"
          class="text-red-500 text-sm w-full mt-1"
        >
          Password must be at least 8 characters long!
        </p>
      </div>
      <div class="flex flex-col gap-4 justify-center mt-4">
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Register
        </button>
        <div class="flex justify-center text-black">
          <p>
            Don't have an account, click
            <router-link class="hover:text-blue-600 text-green-600" to="/login">Login</router-link>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>
