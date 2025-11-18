import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const login = (data: any) => {
    user.value = data
  }
  const logout = () => {
    user.value = null
  }
  const isLoggedIn = () => !!user.value

  return { user, login, logout, isLoggedIn }
})
