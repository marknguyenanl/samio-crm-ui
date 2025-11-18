import { api } from "@/api/axios.ts"

export async function loginAPI(data) {
  try {
    const response = await api.post('auth/login', { ...data })
    return response.data
  } catch (error) {
    console.log('error is: ', error)
  }
}

export async function registerAPI(data) {
  try {

    const response = await api.post('auth/register', {
      ...data,
      password_confirmation: data.password,
    })
    if (response.status === 201) {
      console.log('Successfully created user')
    }
    return response.status
  } catch (error) {
    console.log('Cannot log in with error: ', error)
    return null
  }
}
