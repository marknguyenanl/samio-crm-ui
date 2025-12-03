<script setup>
import { reactive, ref } from 'vue'
import LeadForm from '@/pages/Dashboard/Leads/LeadForm.vue'
import LeadTable from '@/pages/Dashboard/Leads/LeadTable.vue'

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
    <button
      @click="openLeadModal"
      class="h-10 ml-10 mt-8 cursor-pointer flex items-center px-4 py-2 bg-[#f97300] hover:text-[#f97300] duration-300 border-[#f97300] hover:border transition-all hover:scale-110 hover:bg-[#fae9d7] text-[#386641] text-sm font-medium rounded-md shadow-sm focus:outline-none"
    >
      New
    </button>

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
    <button>Prev</button>
    <button>moving</button>
    <button>Next</button>
  </div>
</template>
