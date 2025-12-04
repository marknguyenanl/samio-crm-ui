<script setup lang="ts">
import { LeadProps } from '@/api/leads'
import { useLeadStore } from '@/stores/lead'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import LeadDetail from '@/pages/Dashboard/Leads/LeadDetail.vue'
import Button from '@/components/Button.vue'

const props = defineProps(['setPerPage'])
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

const leadItems = computed<LeadProps[]>(() => leads.value?.data ?? [])
const currentPage = computed(() => leads.value?.meta?.current_page || 1)
const lastPage = computed(() => leads.value?.meta?.last_page || 1)
const prevPage = async () => {
  if (currentPage.value > 1) await fetchLeads(currentPage.value - 1, props.setPerPage)
}

const nextPage = async () => {
  if (currentPage.value < lastPage.value) await fetchLeads(currentPage.value + 1, props.setPerPage)
}

onMounted(async () => {
  await fetchLeads(1, props.setPerPage)
})

watch(
  () => props.setPerPage,
  async (newPerPage) => {
    await fetchLeads(1, newPerPage)
  },
)
</script>

<template>
  <div class="">
    <table class="mt-4 min-w-full divide-y divide-gray-200 table-fixed">
      <thead class="bg-samio-gold text-samio-green-dark">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Tel</th>
          <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Email</th>
          <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Source</th>
          <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
            Address
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <!-- Data rows will go here -->
        <tr
          class="divide-y divide-gray-200 table-fixed text-samio-green cursor-pointer hover:bg-samio-cream hover:text-samio-orange"
          v-for="lead in leadItems"
          :key="lead.id + '-' + lead.name"
          @click="openLeadModalFor(lead)"
        >
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
          <LeadDetail v-if="showLeadModal" :lead="selectedLead" @close="closeLeadModal" />
        </Transition>
      </tbody>
    </table>
    <div class="flex items-center gap-2 mt-4 justify-center">
      <Button variant="secondary" size="sm" :disabled="currentPage === 1" @click="prevPage">
        &lt;&lt;
      </Button>

      <span class="text-sm text-gray-600"> Page {{ currentPage }} of {{ lastPage }} </span>

      <Button variant="secondary" size="sm" :disabled="currentPage === lastPage" @click="nextPage">
        &gt;&gt;</Button
      >
    </div>
  </div>
</template>
