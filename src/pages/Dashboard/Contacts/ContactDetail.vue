<script setup lang="ts">
import ModalLayout from '@/layouts/ModalLayout.vue'
import { useContactStore } from '@/stores/contact'
import { useModalStore } from '@/stores/modal'
import { reactive } from 'vue'
const props = defineProps(['contact'])
const emit = defineEmits<{
  (e: 'close'): void
}>()
const closeModal = () => {
  emit('close')
}

const { toggleModal } = useModalStore()

const contactStore = useContactStore()

const leadInput = reactive({
  id: props.contact.id,
  name: props.contact.name,
  stage_id: props.contact.stage_id,
  tel: props.contact.tel,
  email: props.contact.email,
  source: props.contact.source,
  address: props.contact.address,
})

// todo: optimize with optimistic update
const onUpdateContact = async () => {
  // submit update -> pinia state update -> send api, valid if status ok, reject if it is not
  toggleModal('contact-detail', 'close')
  console.log('update contact clicked')
  await contactStore.updateContactOptimistic(leadInput)
}
</script>

<template>
  <ModalLayout>
    <div>
      <h3 class="pb-4 font-semibold text-samio-green">EDIT CONTACT:</h3>
      <form @submit.prevent="onUpdateContact" class="space-y-4">
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
