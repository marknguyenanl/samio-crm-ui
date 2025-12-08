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
      const rawApi = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 10000
      })
      const { data } = await rawApi.post('/v1/refresh') // or your refresh route
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
      // 2) Log refresh errors
      if (axios.isAxiosError(refreshError)) {
        console.error(
          '[API] Token refresh failed:',
          'message =', refreshError.message,
          'status =', refreshError.response?.status,
          'url =', refreshError.config?.url,
          'data =', refreshError.response?.data,
        );
      } else if (refreshError instanceof Error) {
        console.error('[API] Token refresh failed:', refreshError.message, refreshError);
      } else {
        console.error('[API] Token refresh failed (unknown error):', refreshError);
      }

      localStorage.removeItem('access_token')
      pendingRequests = []
      // Optionally redirect to login
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }

  if (axios.isAxiosError(error)) {
    console.error(
      '[API] Request failed:',
      'message =', error.message,
      'method =', error.config?.method?.toUpperCase(),
      'url =', error.config?.url,
      'status =', error.response?.status,
      'data =', error.response?.data,
    );
  } else if (error instanceof Error) {
    console.error('[API] Request failed:', error.message, error);
  } else {
    console.error('[API] Request failed (unknown error):', error);
  }

  return Promise.reject(error)
});

