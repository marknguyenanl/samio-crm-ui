import { getLeadsAPI, LeadProps } from '@/api/leads';
import { defineStore } from 'pinia'
import { ref } from 'vue'


type LeadsResponse = {
  success: boolean
  data: LeadProps[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
    // add any other meta fields you have (per_page, total, etc.)
    // [key: string]: any
  }
}

// todo: apply optimistic update for useLeadStore
export const useLeadStore = defineStore('leads', () => {
  const leads = ref<LeadsResponse | null>(null);

  const fetchLeads = async (page = 1, perPage = 15) => {
    const response = await getLeadsAPI(page, perPage);
    leads.value = response;
  };
  return { leads, fetchLeads };
})
