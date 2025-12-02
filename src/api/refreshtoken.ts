import { api } from "./axios.ts"

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken')
  const res = await api.post("/v1/refresh", {
    refresh_token: refreshToken
  })
  return res.data.access_token
}
