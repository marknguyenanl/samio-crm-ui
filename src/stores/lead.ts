import { getLeadByIdAPI, getLeadsAPI, LeadProps, updateLeadAPI } from '@/api/leads';
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
  const leadsById = ref<Record<string, LeadProps>>({})
  const currentPage = ref(1)
  const perPage = ref(10)

  const fetchLeads = async (page = currentPage.value, per = perPage.value) => {
    const response = await getLeadsAPI(page, per);
    leads.value = response;
    currentPage.value = page;
    perPage.value = per;
  };

  const updateLead = async (lead: LeadProps) => {
    const res = await updateLeadAPI(lead);
    return res;
  }

  const updateLeadOptimistic = async (partialLead: LeadProps & { id: string }) => {
    const index: any = leads.value?.data.findIndex(l => l.id === partialLead.id);
    if (index === -1) throw new Error(`Lead ${partialLead.id} not found`);

    const backup = { ...leads.value!.data[index]! };

    // optimistic update in list
    leads.value!.data[index] = { ...backup, ...partialLead };

    try {
      await updateLeadAPI(partialLead);

      // refetch the current page after successful update
      await fetchLeads(currentPage.value, perPage.value);
    } catch (err) {
      // rollback
      leads.value!.data[index] = backup;
      throw err;
    }
  };


  return { leads, leadsById, currentPage, perPage, fetchLeads, updateLead, updateLeadOptimistic };
})
