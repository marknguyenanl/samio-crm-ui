import { AxiosError } from "axios";
import { api } from "./axios.ts"

export interface LeadProps {
  id: string;
  name: string;
  tel: string;
  email: string;
  source: string;
  address: string;
}

export async function getLeadsAPI() {
  try {
    const response = await api.get('/v1/leads')
    return response.data.data
  } catch (err) {
    console.log('error when fetch: ', err)
  }
}
export async function addLeadAPI(data: LeadProps) {
  try {
    const response = await api.post('/v1/leads', { ...data })
    return response.data
  } catch (err) {
    const error = err as AxiosError
    console.error('Auth API error:', error)
    return { ok: false, error }
  }
}
