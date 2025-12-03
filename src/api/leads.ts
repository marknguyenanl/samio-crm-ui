import { AxiosError } from "axios";
import { api } from "./axios.ts"

export interface LeadProps {
  id: string | number;
  name: string;
  tel: string;
  email: string;
  source: string;
  address: string;
}

export async function getLeadsAPI() {
  try {
    const response = await api.get('/v1/leads?per_page=10')
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

// todo: check api processing from server after send update request
export async function updateLeadAPI(lead: LeadProps) {
  try {
    const response = await api.put(`/v1/leads/${lead.id}`, { ...lead })
    return response.data
  } catch (err) {
    console.error('error is: ', err)
  }
}
