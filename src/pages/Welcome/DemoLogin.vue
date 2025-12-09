<script setup>
import { onMounted, reactive } from 'vue'
import { demoLoginAPI } from '@/api/auth' 
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router' 

const { setTokens } = useAuthStore()
const router = useRouter()

onMounted(() => {
  setTimeout(async () => {
    try {
      // await auth.login(user)
      const data = await demoLoginAPI()
      setTokens(data.access_token)
      router.push({ name: 'dashboard' })
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
