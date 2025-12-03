import { getLeadsAPI, LeadProps } from '@/api/leads';
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useLeadStore = defineStore('leads', () => {
  const leads = ref<any[]>([]);
  const meta = ref({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0
  })
  const fetchLeads = async (page = 1) => {
    const res = await getLeadsAPI(page, meta.value.per_page);
    leads.value = res.data
    meta.value = res.meta
  };
  return { leads, meta, fetchLeads };
})
