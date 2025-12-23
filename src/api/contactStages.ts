import { api } from "./axios.ts"

export async function getContactStageAPI() {
  try {
    const response = await api.get(`/v1/contact-stages`)
    return response.data
  } catch (error) {
    // return { ok: false, error }
    throw error
  }
}

