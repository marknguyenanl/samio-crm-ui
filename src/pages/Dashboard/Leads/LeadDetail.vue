<script setup lang="ts">
import { updateLeadAPI } from '@/api/leads'
import ModalLayout from '@/layouts/ModalLayout.vue'
import { reactive } from 'vue'
const props = defineProps(['lead', 'showLeadModal'])
const emit = defineEmits<{
  (e: 'close'): void
}>()
const closeModal = () => {
  emit('close')
}

const leadInput = reactive({
  id: props.lead.id,
  name: props.lead.name,
  tel: props.lead.tel,
  email: props.lead.email,
  source: props.lead.source,
  address: props.lead.address,
})

// todo: post to pinia first then call api later
const updateLead = async () => {
  const res = await updateLeadAPI(leadInput)
  console.log('update lead with data: ', leadInput)
  return res.status
}
</script>

<template>
  <ModalLayout>
    <div>
      <h3 class="pb-4 font-semibold text-samio-green">EDIT LEAD:</h3>
      <form @submit.prevent="updateLead" class="space-y-4">
        <div class="flex flex-col">
          <label for="name" class="text-samio-green mb-1 text-sm font-medium">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            v-model="leadInput.name"
            class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label for="tel" class="text-samio-green mb-1 text-sm font-medium">Tel:</label>
          <input
            id="tel"
            type="tel"
            name="tel"
            v-model="leadInput.tel"
            class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label for="email" class="text-samio-green mb-1 text-sm font-medium">
            Email: <span class="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            v-model="leadInput.email"
            required
            class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label for="source" class="text-samio-green mb-1 text-sm font-medium">Source:</label>
          <input
            id="source"
            type="text"
            name="source"
            v-model="leadInput.source"
            class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label for="address" class="text-samio-green mb-1 text-sm font-medium">Address:</label>
          <input
            id="address"
            type="text"
            name="address"
            v-model="leadInput.address"
            class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>
        <div class="flex gap-4">
          <button class="cursor-pointer bg-samio-orange rounded-sm py-1 px-4" type="submit">
            Update
          </button>
          <button
            class="cursor-pointer border rounded-sm border-samio-green py-1 px-4"
            type="button"
            @click="closeModal"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </ModalLayout>
</template>
