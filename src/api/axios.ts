import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000
})

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
},
  // { synchronous: true, runWhen: () => /* This function returns true */}
)
api.interceptors.response.use(function onFulfilled(response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function onRejected(error) {
  // someday: handling response from 401 and request with refresh token
  if (error.response?.status === 401) {
    const auth = useAuthStore()
    auth.logout()
  }
  return Promise.reject(error);
});

