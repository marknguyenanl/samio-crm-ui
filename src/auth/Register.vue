<script setup lang="ts">
import { reactive } from 'vue'
import { api } from '@/api/axios.js'
import { useRouter } from 'vue-router'

const user = reactive({
  email: '',
  password: '',
})

const router = useRouter()

function submitForm() {
  const req_create_user = async () => {
    const password_confirmation = user.password
    const response = await api.post('auth/register', {
      ...user,
      password_confirmation,
    })

    if (response.status === 201) {
      console.log('Successfully created user')
    }
    router.push({ name: 'login' })
  }
  req_create_user()
}
</script>
<template>
  <div class="mt-50 max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
    <form class="space-y-6" @submit.prevent="submitForm">
      <div class="flex flex-col sm:flex-row items-center sm:space-x-4">
        <label class="w-1/4 font-semibold text-gray-700" for="email">Email</label>
        <input
          id="email"
          class="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="user.email"
        />
      </div>
      <div class="flex flex-col sm:flex-row items-center sm:space-x-4">
        <label class="w-1/4 font-semibold text-gray-700" for="password">Password</label>
        <input
          id="password"
          type="password"
          class="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="user.password"
        />
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
