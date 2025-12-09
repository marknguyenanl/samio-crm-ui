import { addLeadAPI, deleteLeadAPI, getLeadsAPI, LeadProps, updateLeadAPI } from '@/api/leads';
import { useToast } from '@/hooks/useToast';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'


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
  const perPage = ref(15)

  const currentRequestId = ref(0)

  const fetchLeads = async (page = currentPage.value, per = perPage.value) => {
    const requestId = ++currentRequestId.value

    const response = await getLeadsAPI(page, per)

    // If a newer request was started after this one, ignore this result
    if (requestId !== currentRequestId.value) {
      return
    }
    leads.value = response;
  };

  const updateLeadOptimistic = async (partialLead: LeadProps & { id: string }) => {
    const { success , error: errorToast } = useToast()
    const index: any = leads.value?.data.findIndex(l => l.id === partialLead.id);
    if (index === -1) throw new Error(`Lead ${partialLead.id} not found`);

    const backup = { ...leads.value!.data[index]! };

    // optimistic update in list
    leads.value!.data[index] = { ...backup, ...partialLead };

    try {
      await updateLeadAPI(partialLead);

      // refetch the current page after successful update
      success('Successfully update Lead')

      await fetchLeads(currentPage.value, perPage.value);
    } catch (error) {
      // rollback
      leads.value!.data[index] = backup;
      throw error;
    }
  };

  const addLeadOptimistic = async (partialLead: LeadProps & { id: string }) => {
    const { success } = useToast()

    if (!partialLead.id) {
      partialLead.id = uuidv4()
    }

    // push optimistically and remember index
    const index = leads.value!.data.push(partialLead)
    leads.value!.data.unshift(partialLead)

    try {
      const createdLead = await addLeadAPI(partialLead);

      // update local data with real server lead
      leads.value!.data[index] = createdLead
      // refetch the current page after successful update

      await fetchLeads(currentPage.value, perPage.value);

      success('Successfully add Lead')

    } catch (error) {
      // rollback
      leads.value!.data.splice(index, 1)
      throw error;
    }
  };

  const deleteLeadOptimistic = async (id: any) => {
    const { success , error: errorToast } = useToast()
    const backup = leads.value!.data.find(l => l.id == id)
    const index = leads.value!.data.findIndex(l => l.id == id)
    if (index !== -1) {
      leads.value!.data.splice(index, 1)

      try {
        await deleteLeadAPI(id)
        await fetchLeads(currentPage.value, perPage.value);
        success('Successfully deleted Lead')
      } catch (error) {
        errorToast('Error deleting Lead')
        leads.value!.data.splice(index, 0, backup)
      }
  }
  }


  return { leads, leadsById, currentPage, perPage, fetchLeads, updateLeadOptimistic, addLeadOptimistic, deleteLeadOptimistic }
})
