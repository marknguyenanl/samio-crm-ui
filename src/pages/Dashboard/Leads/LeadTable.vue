<script setup lang="ts">
import { LeadProps } from '@/api/leads'
import { useLeadStore } from '@/stores/lead'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import LeadDetail from '@/pages/Dashboard/Leads/LeadDetail.vue'
import Button from '@/components/Button.vue'
import { useModalStore } from '@/stores/modal'
import useDebounce from '@/hooks/useDebounce'

const leadStore = useLeadStore()
const { leads, currentPage, sortBy, sortDir } = storeToRefs(leadStore)

const modalStore = useModalStore()
const { isModalOn } = storeToRefs(modalStore)
const { toggleModal } = modalStore

const selectedLead = ref<LeadProps>()
const { debounceTimer } = useDebounce()

const openLeadModal = (lead: LeadProps) => {
  selectedLead.value = { ...lead }
  toggleModal('lead-detail', 'open')
}
const closeLeadModal = () => {
  selectedLead.value = undefined
  toggleModal('lead-detail', 'close')
}

const deleteLead = async (id: any) => {
  await leadStore.deleteLeadOptimistic(id)
}

const sort = async (column: any) => {
  if (sortBy.value === column) {
    sortDir.value = sortDir.value === 'desc' ? 'asc' : 'desc'
  } else {
    sortBy.value = column
    sortDir.value = 'desc'
  }
}

currentPage.value = leads.value?.meta?.current_page || 1
const lastPage = computed(() => leads.value?.meta?.last_page || 1)

const prevPage = async () => {
  if (currentPage.value == 1) return

  currentPage.value--

  console.log('prevPage → currentPage', currentPage.value)
}

const nextPage = async () => {
  if (currentPage.value >= lastPage.value) {
    currentPage.value = lastPage.value
    return
  }

  currentPage.value++

  console.log('nextPage → currentPage', currentPage.value)
}

onMounted(async () => {
  await leadStore.fetchLeads()
})

watch([() => currentPage.value, () => sortDir.value, () => sortBy.value], () => {
  debounceTimer(async () => {
    try {
      await leadStore.fetchLeads()
    } catch (e) {
      console.error(e)
    }
  })
})
</script>

<template>
  <div class="max-w-full mx-auto h-fit">
    <table class="mt-4 min-w-full divide-y divide-gray-200">
      <thead class="bg-samio-gold text-samio-green-dark">
        <tr>
          <th class="gap-4 px-6 py-3 text-left text-xs font-semibold uppercase">Trash</th>
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
          <th @click="sort('email')" class="px-6 py-3 text-left text-xs font-semibold uppercase">
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
          <th @click="sort('address')" class="px-6 py-3 text-left text-xs font-semibold uppercase">
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
          v-for="lead in leads?.data"
          :key="lead.id + '-' + lead.name"
          @click="openLeadModal(lead)"
        >
          <td @click.stop="deleteLead(lead.id)" class="px-6 py-4 whitespace-nowrap text-sm">
            <i class="fa fa-trash text-red-500 cursor-pointer"></i>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">{{ lead.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">{{ lead.tel }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">{{ lead.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">{{ lead.source }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">{{ lead.address }}</td>
        </tr>
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <LeadDetail
            v-if="isModalOn === 'lead-detail'"
            :lead="selectedLead"
            @close="closeLeadModal"
          />
        </Transition>
      </tbody>
    </table>
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
