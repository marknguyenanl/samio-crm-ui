<script setup lang="ts">
const props = defineProps<{
  form: { name: string; stage: string; tel: string; email: string; source: string; address: string }
}>()
import ModalLayout from '@/layouts/ModalLayout.vue'
import { useModalStore } from '@/stores/modal'
import { useContactStore } from '@/stores/contact'
import { v4 as uuidv4 } from 'uuid'

const { toggleModal } = useModalStore()
const contactStore = useContactStore()

const onSubmitContactForm = async () => {
  try {
    await contactStore.addContactOptimistic({ ...props.form, id: uuidv4() })

    // clear form only if request succeeded
    props.form.name = ''
    props.form.stage = 'prospect'
    props.form.tel = ''
    props.form.email = ''
    props.form.source = ''
    props.form.address = ''

    // close modal
    toggleModal('contact-form', 'close')
  } catch (error) {
    console.error('Error adding lead:', error)
  }
}
</script>

<template>
  <ModalLayout>
    <div>
      <h3 class="pb-4 font-semibold text-samio-green">ADD CONTACT:</h3>
      <form @submit.prevent="onSubmitContactForm" class="space-y-4">
        <div class="flex flex-col">
          <label for="name" class="text-samio-green mb-1 text-sm font-medium">Name:</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            name="name"
            class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label for="tel" class="text-samio-green mb-1 text-sm font-medium">Tel:</label>
          <input
            id="tel"
            v-model="form.tel"
            type="tel"
            name="tel"
            class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label for="email" class="text-samio-green mb-1 text-sm font-medium">
            Email: <span class="text-red-500">*</span>
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            required
            class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
          <!-- todo: fix add new contact and its project -->
        </div>

        <div class="flex flex-col">
          <label for="source" class="text-samio-green mb-1 text-sm font-medium">Source:</label>
          <input
            id="source"
            v-model="form.source"
            type="text"
            name="source"
            class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>

        <div class="flex flex-col">
          <label for="address" class="text-samio-green mb-1 text-sm font-medium">Address:</label>
          <input
            id="address"
            v-model="form.address"
            type="text"
            name="address"
            class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>
        <div class="flex gap-4">
          <button class="cursor-pointer bg-samio-orange rounded-sm py-1 px-4" type="submit">
            Submit
          </button>
          <button
            class="cursor-pointer border rounded-sm border-samio-green py-1 px-4"
            type="button"
            @click="toggleModal('contact-form', 'close')"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </ModalLayout>
</template>
