import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const router = useRouter()
  const login = (data, token) => {
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
