import { AxiosError } from "axios";
import { api } from "./axios.ts"

export interface LeadProps {
  id?: string | number | undefined;
  name: string;
  tel: string;
  email: string;
  source: string;
  address: string;
}

export async function getLeadsAPI(page: number, perPage = 15) {
  try {
    const response = await api.get(`/v1/leads?per_page=${perPage}&page=${page}`)
    console.log('response data: ', response.data)
    return response.data
  } catch (err) {
    console.log('error when fetch: ', err)
  }
}

export async function getLeadByIdAPI(id: string) {
  try {
    const response = await api.get(`/v1/leads/${id}`)
    console.log('response data: ', response.data)
    return response.data
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

// todo: check api processing from server after send update request
export async function updateLeadAPI(lead: LeadProps) {
  const { id, ...payload } = lead
  try {
    const response = await api.patch(`/v1/leads/${id}`, payload)
    return response.data
  } catch (err) {
    console.error('error is: ', err)
  }
}
