<script setup lang="ts">
import { LeadProps } from '@/api/leads'
import { useLeadStore } from '@/stores/lead'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import LeadDetail from '@/pages/Dashboard/Leads/LeadDetail.vue'

const leadStore = useLeadStore()
const { leads } = storeToRefs(leadStore)
const { fetchLeads } = leadStore

const showLeadModal = ref(false)
const selectedLead = ref<LeadProps>()

const openLeadModalFor = (lead: LeadProps) => {
  selectedLead.value = { ...lead }
  showLeadModal.value = true
}
const closeLeadModal = () => {
  showLeadModal.value = false
  selectedLead.value = undefined
}

onMounted(async () => {
  await fetchLeads()
  console.log('leads: ', leads.value) // now has data
})
</script>

<template>
  <table class="mt-4 min-w-full divide-y divide-gray-200 table-fixed">
    <thead class="bg-gray-200">
      <tr>
        <th
          class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider"
        >
          Lead
        </th>
        <th
          class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider"
        >
          Name
        </th>
        <th
          class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider"
        >
          Tel
        </th>
        <th
          class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider"
        >
          Email
        </th>
        <th
          class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider"
        >
          Source
        </th>
        <th
          class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider"
        >
          Address
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <!-- Data rows will go here -->
      <tr
        class="cursor-pointer hover:bg-[#fae9d7]"
        v-for="lead in leads"
        :key="lead.id + '-' + lead.name"
        @click="openLeadModalFor(lead)"
      >
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {{ lead.id }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ lead.name }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ lead.tel }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ lead.email }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ lead.source }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ lead.address }}</td>
      </tr>
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <LeadDetail v-if="showLeadModal" :lead="selectedLead" @close="closeLeadModal" />
      </Transition>
    </tbody>
  </table>
</template>
