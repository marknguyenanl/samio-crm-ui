import type { LoginPayload } from '@/api/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


export const useAuthStore = defineStore('auth', () => {
  const user = ref<LoginPayload | null>(null);
  const router = useRouter()
  const login = (data: LoginPayload, token: any) => {
    localStorage.setItem('access_token', token)
    user.value = data
    router.push({ name: 'dashboard' })
  }
  const logout = () => {
    localStorage.removeItem('access_token')
    user.value = null
    router.push({ name: 'login' })
  }
  const isLoggedIn = () => !!user.value

  return { user, login, logout, isLoggedIn }
})
