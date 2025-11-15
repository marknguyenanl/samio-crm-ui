<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()
function submitForm() {
  alert(`Registering in with ${username.value}`)
  // c: check if has account
  if (username.value === 'admin' && password.value === 'admin') {
    router.replace('/dashboard')
  } else {
    // if not having account then route to register
    router.push('/register')
  }
}
</script>
<template>
  <div class="mt-50 max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
    <form class="space-y-6" @submit.prevent="submitForm">
      <div class="flex flex-col sm:flex-row items-center sm:space-x-4">
        <label class="w-1/4 font-semibold text-gray-700" for="username">Username</label>
        <input
          id="username"
          class="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="username"
        />
      </div>
      <div class="flex flex-col sm:flex-row items-center sm:space-x-4">
        <label class="w-1/4 font-semibold text-gray-700" for="password">Password</label>
        <input
          id="password"
          type="password"
          class="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="password"
        />
      </div>
      <div class="flex flex-col gap-4 justify-center mt-4">
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Login
        </button>
        <div class="flex justify-center text-black">
          <p>
            Already had an account, click
            <router-link class="hover:text-blue-600 text-green-600" to="/register"
              >Register</router-link
            >
          </p>
        </div>
      </div>
    </form>
  </div>
</template>
