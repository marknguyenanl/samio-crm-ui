import { addContactAPI, deleteContactAPI, getContactsAPI, ContactProps, updateContactAPI, ContactResponse } from '@/api/contacts';
import { useToast } from '@/hooks/useToast';
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export type ContactFilter = {
  search: string | null,
  stage_id: string | null | 'lead' | 'qualified' | 'opportunity' | 'customer' | 'churned'
}


// todo: apply optimistic update for useContactStore
export const useContactStore = defineStore('contacts', () => {

  const contacts = ref<ContactResponse | null>(null);
  const contactsById = ref<Record<string, ContactProps>>({})
  const filter = reactive<ContactFilter>({
    search: null,
    stage_id: null,
  })
  const currentPage = ref(1)
  const perPage = ref(15)
  const sortBy = ref('created_at')
  const sortDir = ref('desc')

  const currentRequestId = ref(0)

  const fetchContacts = async (
    page = currentPage.value,
    per = perPage.value,
    column = sortBy.value,
    dir = sortDir.value,
    filt?: ContactFilter
  ) => {
    const requestId = ++currentRequestId.value

    // use passed filter if provided, else use store filter
    const effectiveFilter = filt ?? filter

    const params: any = {
      page,
      per_page: per,
      sort_by: column,
      sort_dir: dir
    }

    if (effectiveFilter?.search?.trim()) {
      params.search = effectiveFilter.search
    }
    if (effectiveFilter?.stage_id?.trim()) {
      params.stage = effectiveFilter.stage_id
    }

    try {
      const response = await getContactsAPI(params)
      if (requestId !== currentRequestId.value) return
      contacts.value = response
    } catch (err) {
      console.error('fetchContacts failed:', err)
    }

  };

  const updateContactOptimistic = async (partialContact: ContactProps & { id: string }) => {
    const { success, error: errorToast } = useToast()
    const index: any = contacts.value?.data.findIndex(l => l.id === partialContact.id);
    if (index === -1) throw new Error(`Contact ${partialContact.id} not found`);

    const backup = { ...contacts.value!.data[index]! };

    // optimistic update in list
    contacts.value!.data[index] = { ...backup, ...partialContact };

    try {
      await updateContactAPI(partialContact);

      // refetch the current page after successful update
      success('Updated Contact Successfully')

      await fetchContacts();
    } catch (error) {
      // rollback
      errorToast('You got an error')
      contacts.value!.data[index] = backup;
      throw error;
    }
  };

  const addContactOptimistic = async (partialContact: ContactProps & { id: string }) => {
    const { success, error: errorToast } = useToast()

    if (!partialContact.id) {
      partialContact.id = uuidv4()
    }

    // push optimistically and remember index
    const index = contacts.value!.data.unshift(partialContact)

    try {
      const createdContact = await addContactAPI(partialContact);

      // update local data with real server contact
      contacts.value!.data[index] = createdContact
      // refetch the current page after successful update

      await fetchContacts();

      success('Added Contact Successfully')

    } catch (error) {
      // rollback
      contacts.value!.data.splice(index, 1)
      errorToast('You got an error')
      throw error;
    }
  };

  const deleteContactOptimistic = async (id: any) => {
    const { success, error: errorToast } = useToast()
    const backup = contacts.value!.data.find(l => l.id == id)
    const index = contacts.value!.data.findIndex(l => l.id == id)
    if (index !== -1) {
      contacts.value!.data.splice(index, 1)

      try {
        await deleteContactAPI(id)
        await fetchContacts(currentPage.value, perPage.value);
        success('Deleted Contact Successfully')
      } catch (error) {
        errorToast('Error deleting Contact')
        contacts.value!.data.splice(index, 0, backup!)
      }
    }
  }


  return { contacts, contactsById, currentPage, perPage, sortBy, sortDir, filter, fetchContacts, updateContactOptimistic, addContactOptimistic, deleteContactOptimistic }
})
