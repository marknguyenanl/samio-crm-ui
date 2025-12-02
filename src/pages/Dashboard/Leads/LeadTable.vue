<script setup lang="ts">
import { useLeadStore } from '@/stores/lead'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const leadStore = useLeadStore()
const { leads } = storeToRefs(leadStore)
const { fetchLeads } = leadStore

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
      <tr v-for="(contact, index) in leads" :key="index">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {{ contact.id }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contact.name }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contact.tel }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contact.email }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contact.source }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contact.address }}</td>
      </tr>
    </tbody>
  </table>
</template>
