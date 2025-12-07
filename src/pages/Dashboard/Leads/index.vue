<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import LeadForm from '@/pages/Dashboard/Leads/LeadForm.vue'
import LeadTable from '@/pages/Dashboard/Leads/LeadTable.vue'
import { useLeadStore } from '@/stores/lead'

const leadsStore = useLeadStore()
const { perPage } = storeToRefs(leadsStore)
const toggleModal = ref(false)
const form = reactive({
  name: '',
  tel: '',
  email: '',
  source: '',
  address: '',
})
const openLeadModal = () => {
  toggleModal.value = !toggleModal.value
}
</script>

<template>
  <div class="">
    <div class="mt-8 items-center flex mx-10 justify-between">
      <button
        @click="openLeadModal"
        class="h-10 cursor-pointer flex items-center px-4 py-2 bg-samio-orange hover:text-samio-orange duration-300 border-samio-orange hover:border transition-all hover:scale-110 hover:bg-samio-cream text-samio-green text-sm font-medium rounded-md shadow-sm focus:outline-none"
      >
        New
      </button>

      <label class="flex items-center py-1 gap-1 pr-2 border rounded-lg">
        <input
          class="focus:ring-0 focus:ring-offset-0 focus:outline-none active:outline-none active:ring-0 text-right w-8 bg-white"
          type="number"
          v-model.number="perPage"
        />
        per page
      </label>
    </div>

    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <LeadForm :form :openLeadModal :toggleModal v-if="toggleModal" />
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
  -moz-appearance: textfield;
}
</style>
