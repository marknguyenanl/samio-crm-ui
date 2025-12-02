import { getLeadsAPI, LeadProps } from '@/api/leads';
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useLeadStore = defineStore('leads', () => {
  const leads = ref<LeadProps[]>([]);
  const fetchLeads = async () => {
    leads.value = await getLeadsAPI();
  };
  return { leads, fetchLeads };
})
