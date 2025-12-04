import { loginAPI } from '@/api/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(localStorage.getItem('access_token'))
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))
  const user = ref<any | null>(null)
  const router = useRouter()

  function setTokens(tokens: { accessToken: string; refreshToken?: string }) {
    accessToken.value = tokens.accessToken
    localStorage.setItem('access_token', tokens.accessToken)
    if (tokens.refreshToken) {
      refreshToken.value = tokens.refreshToken
      localStorage.setItem('refreshToken', tokens.refreshToken)
    }
  }

  function logout() {
    accessToken.value = null
    refreshToken.value = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('refreshToken')
    router.push({ name: 'login' })
  }

  const login = async (payload: { email: string; password: string }) => {
    const data = await loginAPI(payload)
    setTokens({
      accessToken: data.access_token,
      refreshToken: data.refresh_token
    })
    user.value = data.user ?? null
    router.push({ name: 'dashboard' })
  }

  return { user, accessToken, refreshToken, setTokens, login, logout, }
})
