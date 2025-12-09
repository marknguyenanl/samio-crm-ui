import { LeadFilter } from "@/stores/lead.ts";
import { api } from "./axios.ts"

export interface LeadProps {
  id?: string | number | undefined;
  name: string;
  tel: string;
  email: string;
  source: string;
  address: string;
}
interface LeadsResponse {
  success: boolean
  data: LeadProps[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}
export async function getLeadsAPI(params: any): Promise<LeadsResponse> {
  try {
    const response = await api.get('/v1/leads', { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getLeadByIdAPI(id: string) {
  try {
    const response = await api.get(`/v1/leads/${id}`)
    return response.data
  } catch (error) {
    // return { ok: false, error }
    throw error
  }
}

export async function addLeadAPI(data: LeadProps) {
  try {
    const response = await api.post('/v1/leads', { ...data })
    return response.data
  } catch (error) {
    // return { ok: false, error }
    throw error
  }
}

export async function updateLeadAPI(lead: LeadProps) {
  const { id, ...payload } = lead
  try {
    const response = await api.patch(`/v1/leads/${id}`, payload)
    return response.data
  } catch (error) {
    // return { ok: false, error }
    throw error
  }
}

export function getFilteredLeadsAPI(filter: any) {
  return api.get('/v1/leads?per_page', {
    params: filter
  })
}

export const deleteLeadAPI = async (id: string): Promise<void> => {
  try {
    const response = await api.delete(`/v1/leads/${id}`);
    return response.data
  } catch (error) {
    throw error
  }
};
