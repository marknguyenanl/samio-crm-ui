import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000
})

// todo: authentication with Pinia, localStorage and refreshToken
//
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
},
  // { synchronous: true, runWhen: () => /* This function returns true */}
)
// todo: handling response from 401 and redirect
api.interceptors.response.use(function onFulfilled(response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function onRejected(error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

