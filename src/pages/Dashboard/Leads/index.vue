<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import LeadForm from '@/pages/Dashboard/Leads/LeadForm.vue'
import LeadTable from '@/pages/Dashboard/Leads/LeadTable.vue'
import { useLeadStore } from '@/stores/lead'
import { useModalStore } from '@/stores/modal'
import { watch } from 'vue'
import useDebounce from '@/hooks/useDebounce'

const modalStore = useModalStore()
const { isModalOn } = storeToRefs(modalStore)
const { toggleModal } = modalStore
const leadStore = useLeadStore()
const { currentPage, perPage } = storeToRefs(leadStore)
const filter = leadStore.filter
const { debounceTimer } = useDebounce()

const form = reactive({
  name: '',
  tel: '',
  email: '',
  source: '',
  address: '',
})

// fix: here change to fetchLeads
const loadFilteredLeads = async () => {
  await leadStore.fetchLeads()
}

watch([() => perPage.value, () => filter.search], () => {
  debounceTimer(async () => {
    currentPage.value = 1
    await leadStore.fetchLeads()
  })
})
</script>

<template>
  <div class="">
    <div class="mt-8 items-center flex mx-10 justify-between">
      <button
        @click="toggleModal('lead-form', 'open')"
        class="h-10 cursor-pointer flex items-center px-4 py-2 bg-samio-orange hover:text-samio-orange duration-300 border-samio-orange hover:border transition-all hover:scale-110 hover:bg-samio-cream text-samio-green text-sm font-medium rounded-md shadow-sm focus:outline-none"
      >
        New
      </button>

      <div class="items-center flex gap-4 text-samio-green">
        <div class="flex items-center gap-1">
          <label
            >Filter name:
            <input
              class="cursor-pointer h-8 px-2 border py-1 rounded-lg border-samio-orange focus:ring-0 focus:ring-offset-0 focus:outline-none active:outline-none active:ring-0 text-right w-28 bg-white"
              type="text"
              v-model="filter.search"
              @input="loadFilteredLeads"
            />
          </label>
        </div>
        <label
          class="cursor-pointer h-8 text-sm border-samio-orange flex items-center py-1 gap-1 pr-2 border rounded-lg"
        >
          <input
            class="cursor-pointer focus:ring-0 focus:ring-offset-0 focus:outline-none active:outline-none active:ring-0 text-right w-8 bg-white"
            type="number"
            v-model.number="perPage"
          />
          leads/page
        </label>
      </div>
    </div>

    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <LeadForm :form="form" v-if="isModalOn === 'lead-form'" />
    </Transition>

    <LeadTable />
  </div>
</template>

<style>
/* Chrome, Safari, Edge, Opera */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -webkit-appearance: textfield;
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
