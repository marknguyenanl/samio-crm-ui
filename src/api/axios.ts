import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

api.interceptors.request.use(function (config) {
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
let pendingRequests: ((token: string) => void)[] = []

api.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config

  if (
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true

    // If a refresh is already happening, queue this request
    if (isRefreshing) {
      return new Promise(resolve => {
        pendingRequests.push((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          resolve(api(originalRequest))
        })
      })
    }

    isRefreshing = true

    try {
      const { data } = await api.post('/v1/refresh') // or your refresh route
      const newToken = data.access_token


      localStorage.setItem('access_token', newToken)
      // Update default header for future requests
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`

      // Retry queued requests
      pendingRequests.forEach(cb => cb(newToken))
      pendingRequests = []

      // Retry the original request
      originalRequest.headers.Authorization = `Bearer ${newToken}`
      return api(originalRequest)
    } catch (refreshError) {
      localStorage.removeItem('access_token')
      pendingRequests = []
      // Optionally redirect to login
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }

  return Promise.reject(error)
});

