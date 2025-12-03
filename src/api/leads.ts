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
export interface LeadsResponse {
  data: any[],
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export async function getLeadsAPI(page = 1, perPage = 100): Promise<LeadsResponse> {
  const response = await api.get('/v1/leads', {
    params: {
      page,
      per_page: perPage
    }
  })
  return {
    data: response.data.data,
    meta: response.data.meta
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
