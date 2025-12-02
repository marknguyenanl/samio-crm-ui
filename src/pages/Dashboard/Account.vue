<script setup>
import { useAccountStore } from '@/stores/account'
import { reactive, ref } from 'vue'
const accountStore = useAccountStore()
const { account } = accountStore

const modules = reactive([
  { key: 'leads', label: 'Leads', disabled: true },
  { key: 'contacts', label: 'Contacts', disabled: true },
  { key: 'deals', label: 'Deals', disabled: true },
  { key: 'activities', label: 'Activities', disabled: true },
  { key: 'quotes', label: 'Quotes', disabled: false },
  { key: 'accounts', label: 'Accounts', disabled: false },
  { key: 'orders', label: 'Sales Orders', disabled: false },
  { key: 'purchase', label: 'Purchase Orders', disabled: false },
  { key: 'invoices', label: 'Invoices', disabled: false },
  { key: 'reports', label: 'Reports', disabled: false },
])

const preview = ref('/defaultAvatar.webp')
const fileInput = ref(null)
const currentpass = ref('')
const newpass = ref('')
const retypepass = ref('')
const tagline = ref('You are brilliant')

const handleFile = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (preview.value) URL.revokeObjectURL(preview.value)
    preview.value = URL.createObjectURL(file)
  }
}

const enableModulesSubmit = () => {
  console.log('send request axios update state')
}

const openFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  } else {
    console.warn('File input ref is not set yet')
  }
}
</script>

<template>
  <!-- form fluently -->
  <!-- todo: avatar image add upload function and work with backend -->
  <div class="container mx-auto mt-10 md:mt-20 flex flex-col gap-1">
    <!-- click on edit will toggle form input -->
    <h2 class="font-bold text-2xl md:text-4xl">Account:</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12">
      <div
        class="relative h-auto flex flex-col gap-1 justify-center items-center mt-4 py-2 rounded-sm bg-gray-100"
      >
        <div class="inset-0 cursor-pointer w-auto h-auto absolute" @click="openFileInput">
          <img v-if="preview" :src="preview" class="h-full mx-auto aspect-square object-cover" />
          <p v-else class="text-center">UPLOAD</p>
          <input
            hidden
            id="avatar-input"
            ref="fileInput"
            type="file"
            @change="handleFile"
            accept="image/*"
          />
        </div>

        <div class="absolute bottom-0 h-20 bg-gray-300 w-full">
          <p class="pl-4 pt-2 font-bold text-xl italic titlecase">{{ account.name }}</p>
          <input
            class="rounded-sm px-4 py-1 w-[90%]"
            placeholder="Tagline"
            type="text"
            v-model="tagline"
          />
        </div>
      </div>
      <div class="mt-4 rounded-sm px-4 py-2 bg-gray-100">
        <form action="  ">
          <h3 class="pt-1 font-bold text-lg md:text-xl">Enable modules:</h3>
          <ul class="px-4 py-2">
            <li class="text-md flex" v-for="(mod, index) in modules">
              <label class="cursor-pointer py-1">
                <input
                  type="checkbox"
                  :key="index"
                  :name="account[mod.label]"
                  :disabled="mod.disabled"
                  v-model="account[mod.key]"
                />
                {{ mod.label }}</label
              >
            </li>
          </ul>
          <button
            type="submit"
            @submit.prevent="enableModulesSubmit"
            class="cursor-pointer w-fit px-4 py-1 ml-4 border bg-blue-400 text-white rounded-md hover:bg-green-400"
          >
            Submit
          </button>
        </form>
      </div>
      <div class="flex flex-col mt-4 rounded-sm px-4 py-2 bg-gray-100 gap-2">
        <h3 class="mb-1 pt-1 font-bold text-lg md:text-xl">Security:</h3>
        <label class="flex flex-col gap-2"
          >Change password:
          <input
            type="text"
            class="px-4 mt-2 py-1 bg-white rounded-sm"
            v-model="currentpass"
            placeholder="Current password"
          />
          <input
            type="password"
            class="px-4 py-1 bg-white rounded-sm"
            v-model="newpass"
            placeholder="New password"
          />
          <input
            type="text"
            class="px-4 py-1 bg-white rounded-sm"
            v-model="retypepass"
            placeholder="Retype new password"
          />
          <button
            type="button"
            @click="change_password"
            class="cursor-pointer px-4 py-1 mt-4 text-left w-fit bg-white rounded-sm"
          >
            Change password
          </button>
        </label>
        <!-- todo: display updated password after click save (checked updated pass then prompt) -->
        <div class="" v-if="!!newpass">Password is updated</div>
      </div>
    </div>
  </div>
</template>
