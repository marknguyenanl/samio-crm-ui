<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

onMounted(() => {
  setTimeout(async () => {
    try {
      // await auth.login(user)
      const demoUser = {
        email: 'demo@samiohome.com',
        password: 'demoaccount',
      }
      await auth.login(demoUser)
    } catch (error) {
      console.error('Demo login failed', error)
    }
  }, 1000)
})
</script>

<template>
  <div class="flex flex-col gap-4 h-[70vh] text-samio-green items-center justify-center">
    <span
      class="relative h-12 w-12 animate-spin rounded-full border-4 border-samio-orange border-t-transparent"
    ></span>
    <span>Logging into your account…</span>
  </div>
</template>
