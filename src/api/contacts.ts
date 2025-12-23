import { api } from "./axios.ts"

export interface ContactProps {
  id?: string | number | undefined;
  stage_id?: number;
  name?: string;
  tel?: string;
  email?: string;
  source?: string;
  address?: string;
}
export interface ContactResponse {
  success: boolean
  data: ContactProps[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}
export async function getContactsAPI(params: any): Promise<ContactResponse> {
  try {
    const response = await api.get('/v1/contacts', { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getContactByIdAPI(id: string) {
  try {
    const response = await api.get(`/v1/contacts/${id}`)
    return response.data
  } catch (error) {
    // return { ok: false, error }
    throw error
  }
}

export async function addContactAPI(data: ContactProps) {
  try {
    const response = await api.post('/v1/contacts', { ...data })
    return response.data
  } catch (error) {
    // return { ok: false, error }
    throw error
  }
}

export async function updateContactAPI(lead: ContactProps) {
  const { id, ...payload } = lead
  try {
    const response = await api.patch(`/v1/contacts/${id}`, payload)
    return response.data
  } catch (error) {
    // return { ok: false, error }
    throw error
  }
}

export function getFilteredContactsAPI(filter: any) {
  return api.get('/v1/contacts?per_page', {
    params: filter
  })
}

export const deleteContactAPI = async (id: string): Promise<void> => {
  try {
    const response = await api.delete(`/v1/contacts/${id}`);
    return response.data
  } catch (error) {
    throw error
  }
};

export const getDailyLeads = async () => {
  try {
    const res = await api.get('/v1/contacts/daily-leads')
    return res.data
  } catch (error) {
    throw error
  }
}
