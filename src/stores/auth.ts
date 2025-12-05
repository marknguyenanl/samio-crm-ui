import { loginAPI } from '@/api/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(localStorage.getItem('access_token'))
  const user = ref<any | null>(null)
  const router = useRouter()

  function setTokens(token: string) {
    accessToken.value = token
    localStorage.setItem('access_token', token)
  }

  function logout() {
    accessToken.value = null
    localStorage.removeItem('access_token')
    router.push({ name: 'login' })
  }

  async function login(payload: { email: string; password: string }) {
    const data = await loginAPI(payload)
    setTokens(data.access_token)
    user.value = data.user ?? null
    router.push({ name: 'dashboard' })
  }

  return { user, accessToken, setTokens, login, logout }
})
