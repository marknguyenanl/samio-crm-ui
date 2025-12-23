<script setup lang="ts">
import { ContactProps } from '@/api/contacts'
import { useContactStore } from '@/stores/contact'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import ContactDetail from '@/pages/Dashboard/Contacts/ContactDetail.vue'
import Button from '@/components/Button.vue'
import { useModalStore } from '@/stores/modal'
import useDebounce from '@/hooks/useDebounce'
import { api } from '@/api/axios'
import { getContactStageAPI } from '@/api/contactStages'

const contactStore = useContactStore()
const { contacts, currentPage, sortBy, sortDir } = storeToRefs(contactStore)

const modalStore = useModalStore()
const { isModalOn } = storeToRefs(modalStore)
const { toggleModal } = modalStore

const selectedContact = ref<ContactProps>()
const { debounceTimer } = useDebounce()

const openContactModal = (contact: ContactProps) => {
  selectedContact.value = { ...contact }
  toggleModal('contact-detail', 'open')
}
const closecontactModal = () => {
  selectedContact.value = undefined
  toggleModal('contact-detail', 'close')
}

const deleteContact = async (id: any) => {
  await contactStore.deleteContactOptimistic(id)
}

const movingStage = async (id: any, curStage_id: any) => {
  await api.post('/v1/contact-stages/next', { contact_id: id, current_stage_id: curStage_id })
  await contactStore.fetchContacts()
}

const sort = async (column: any) => {
  if (sortBy.value === column) {
    sortDir.value = sortDir.value === 'desc' ? 'asc' : 'desc'
  } else {
    sortBy.value = column
    sortDir.value = 'desc'
  }
}

currentPage.value = contacts.value?.meta?.current_page || 1
const lastPage = computed(() => contacts.value?.meta?.last_page || 1)

const prevPage = async () => {
  if (currentPage.value == 1) return

  currentPage.value--
}

const nextPage = async () => {
  if (currentPage.value >= lastPage.value) {
    currentPage.value = lastPage.value
    return
  }

  currentPage.value++
}

const stageMap = ref<Record<number, any>>({})

const fetchStages = async () => {
  const res = await getContactStageAPI()
  const list = res.data
  stageMap.value = list.reduce((map: Record<number, any>, s: any) => {
    map[Number(s.id)] = s
    return map
  }, {})
}
const displayStageName = (contact_stage_id: any) => {
  const id = Number(contact_stage_id)
  const stage = stageMap.value[id]
  return stage ? stage.label : '' // or 'Unknown'
}
onMounted(async () => {
  fetchStages()
  contactStore.filter.stage_id = null
  await contactStore.fetchContacts()
})

watch([() => currentPage.value, () => sortDir.value, () => sortBy.value], () => {
  debounceTimer(async () => {
    try {
      await contactStore.fetchContacts()
    } catch (e) {
      console.error(e)
    }
  })
})
</script>

<template>
  <div class="max-w-full mx-auto h-fit">
    <div class="mt-4 h-[600px] overflow-y-auto">
      <table class="table-fixed w-7xl mx-auto divide-y divide-gray-200">
        <thead class="sticky top-0 z-10 bg-samio-gold text-samio-green-dark">
          <tr>
            <th class="w-16 gap-4 px-6 py-3 text-left text-xs font-semibold uppercase">Utils</th>
            <th @click="sort('stage')" class="w-24">
              <div
                class="flex items-center gap-4 px-6 py-3 text-left text-xs font-semibold uppercase"
              >
                Stage
                <span v-if="sortBy === 'stage'"> {{ sortDir === 'desc' ? '▲' : '▼' }} </span>
              </div>
            </th>
            <th @click="sort('name')" class="">
              <div
                class="flex items-center gap-4 px-6 py-3 text-left text-xs font-semibold uppercase"
              >
                Name
                <span v-if="sortBy === 'name'"> {{ sortDir === 'desc' ? '▲' : '▼' }} </span>
              </div>
            </th>
            <th @click="sort('tel')" class="">
              <div class="px-6 py-3 text-left text-xs font-semibold uppercase">
                Tel
                <span v-if="sortBy === 'tel'">
                  {{ sortDir === 'desc' ? '▲' : '▼' }}
                </span>
              </div>
            </th>
            <th
              @click="sort('email')"
              class="w-64 px-6 py-3 text-left text-xs font-semibold uppercase"
            >
              Email
              <span v-if="sortBy === 'email'">
                {{ sortDir === 'desc' ? '▲' : '▼' }}
              </span>
            </th>
            <th @click="sort('source')" class="px-6 py-3 text-left text-xs font-semibold uppercase">
              Source
              <span v-if="sortBy === 'source'">
                {{ sortDir === 'desc' ? '▲' : '▼' }}
              </span>
            </th>
            <th
              @click="sort('address')"
              class="w-80 px-6 py-3 text-left text-xs font-semibold uppercase"
            >
              Address
              <span v-if="sortBy === 'address'">
                {{ sortDir === 'desc' ? '▲' : '▼' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <!-- Data rows will go here -->
          <tr
            class="transition-all duration-300 divide-y divide-gray-200 table-fixed text-samio-green cursor-pointer hover:bg-samio-cream hover:text-samio-orange"
            v-for="contact in contacts?.data"
            :key="contact.id + '-' + contact.name"
            @click="openContactModal(contact)"
          >
            <td
              @click.stop=""
              class="flex gap-2 items-center justify-center px-6 py-4 whitespace-nowrap text-sm"
            >
              <i
                @click.stop="deleteContact(contact.id)"
                class="fa fa-trash text-red-500 cursor-pointer p-2"
              ></i>
              <i
                @click.stop="movingStage(contact.id, contact.stage_id)"
                class="fa fa-angles-right text-blue-500 cursor-pointer p-2"
              ></i>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              {{ displayStageName(contact.stage_id) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">{{ contact.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">{{ contact.tel }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">{{ contact.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">{{ contact.source }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">{{ contact.address }}</td>
          </tr>
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-all duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ContactDetail
              v-if="isModalOn === 'contact-detail'"
              :contact="selectedContact"
              @close="closecontactModal"
            />
          </Transition>
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex items-center gap-2 mt-4 justify-center">
    <Button variant="secondary" size="md" :disabled="currentPage === 1" @click="prevPage">
      &lt;&lt;
    </Button>

    <span class="text-sm text-gray-600"> Page {{ currentPage }} of {{ lastPage }} </span>

    <Button variant="secondary" size="md" :disabled="currentPage === lastPage" @click="nextPage">
      &gt;&gt;</Button
    >
  </div>
</template>
