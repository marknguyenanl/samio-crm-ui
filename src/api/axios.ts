import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

api.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers = config.headers || {}
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

let isRefreshing = false
let subscribers: Array<(token: string) => void> = []

function subscribeTokenRefresh(cb: (token: string) => void) {
  subscribers.push(cb)
}
function onRefreshed(token: string) {
  subscribers.forEach((cb) => cb(token))
  subscribers = []
}
api.interceptors.response.use((response) => response, async (error: AxiosError) => {
  const { response, config } = error
  const originalRequest = config as InternalAxiosRequestConfig & { _retry?: boolean }

  // not a 401 -> normal error
  if (!response || response.status !== 401) {
    return Promise.reject(error)
  }

  const auth = useAuthStore()
  const refreshToken = localStorage.getItem('refresh_token') || auth.refreshToken

  // no refresh token -> log out
  if (!refreshToken) {
    auth.logout()
    return Promise.reject(error)
  }
  // prevent infinite loop
  if (originalRequest._retry) {
    auth.logout()
    return Promise.reject(error)
  }
  originalRequest._retry = true

  // If already refreshing, queue this request
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      subscribeTokenRefresh((newToken: string) => {
        if (!originalRequest.headers) originalRequest.headers = new AxiosHeaders()
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        api(originalRequest).then(resolve).catch(reject)
      })
    })
  }
  // start refresh flow
  isRefreshing = true

  try {
    // use plain axios to avoid recursive interceptor calls
    const refreshResponse = await axios.post(`${import.meta.env.VITE_API_URL}/v1/refresh`, { refresh_token: refreshToken })

    const newAccessToken = refreshResponse.data.access_token
    const newRefreshToken = refreshResponse.data.refresh_token ?? refreshToken

    auth.setTokens({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    })

    isRefreshing = false
    onRefreshed(newAccessToken)

    // retry original request with new token
    if (!originalRequest.headers) originalRequest.headers = new AxiosHeaders()
    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
    return api(originalRequest)
  } catch (refreshError) {
    isRefreshing = false
    auth.logout()
    return Promise.reject(refreshError);
  }
});

