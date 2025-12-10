import { api } from "@/api/axios.ts"
import axios from "axios";

export interface LoginPayload {
  email: string;
  password: string;
}


export async function loginAPI(data: LoginPayload) {
  try {
    const response = await api.post('/v1/login', { ...data })
    return response.data
  } catch (error) {
    console.error('error is: ', error)
  }
}

export async function demoLoginAPI() {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/demo`)
    return response.data
  } catch (error) {
    console.error('error is: ', error)
  }
}

export async function registerAPI(data: LoginPayload) {
  const password_confirmation = data.password
  try {
    const response = await api.post('/v1/register', {
      ...data,
      password_confirmation,
    })
    if (response.status === 201) {
      console.log('Successfully created user')
    }
    return response.status
  } catch (error) {
    console.error('Cannot log in with error: ', error)
    return null
  }
}
