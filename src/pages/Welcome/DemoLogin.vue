<script setup>
import { onMounted, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

const user = reactive({
  email: 'demo@samiohome.com',
  password: 'demoaccount',
})

const auth = useAuthStore()

onMounted(() => {
  setTimeout(async () => {
    try {
      await auth.login(user)
    } catch (error) {
      console.error('Demo login failed', error)
    }
  }, 2000)
})
</script>

<template>
  <div class="flex flex-col gap-4 h-[70vh] text-samio-green items-center justify-center">
    <span
      class="relative h-12 w-12 animate-spin rounded-full border-4 border-samio-orange border-t-transparent"
    ></span>
    <span>Logging into the demo account…</span>
  </div>
</template>
