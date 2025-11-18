import { api } from "./axios.ts"

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken')
  const res = await api.post("/auth/refresh", {
    refresh_token: refreshToken
  })
  return res.data.access_token
}
