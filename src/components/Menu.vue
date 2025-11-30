<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import Button from './Button.vue'
import { nextTick, ref } from 'vue'

const { logout } = useAuthStore()
const isSearching = ref(false)
const searchInput = ref<HTMLElement | null>(null)
const showSearchModal = ref(false)
const searchTerm = ref('')
const searchToggle = () => {
  isSearching.value = !isSearching.value
  showSearchModal.value = isSearching.value
  if (isSearching.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}
// todo: search for actions / leads/ marketing (all put in search array)
</script>
<template>
  <nav class="items-center flex justify-between mb-2 p-2 px-4 bg-gray-700 text-white">
    <ul class="items-center flex-row flex gap-8">
      <li class="pb-2">
        <RouterLink :to="{ name: 'dashboard' }">
          <img class="h-14 object-cover" src="/Logo-white.svg" alt="AnrosTech logo" />
        </RouterLink>
      </li>
      <li><RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink></li>
      <li><RouterLink :to="{ name: 'leads' }">Leads</RouterLink></li>
      <li><RouterLink :to="{ name: 'contacts' }">Contacts</RouterLink></li>
      <!-- <li><RouterLink :to="{ name: 'contacts' }">Social</RouterLink></li> -->
    </ul>

    <!-- TODO: Implement feature search once the database is ready -->

    <ul class="items-center flex-row flex gap-4">
      <li>
        <img
          @click="searchToggle"
          v-if="!isSearching"
          src="@/icons/search.svg"
          alt="Search"
          class="w-8 aspect-square"
        />
        <label
          v-if="isSearching"
          class="px-2 rounded-sm py-1 bg-white flex flex-row items-center"
          for="isSearching"
        >
          <input
            ref="searchInput"
            name="isSearching"
            class="bg-white focus:bg-white focus:outline-none text-black"
            v-model="searchTerm"
            @blur="searchToggle"
          />
          <img src="@/icons/close.svg" alt="Close" class="w-6 aspect-square" />
        </label>
        <!-- Simple modal -->

        <div
          v-if="showSearchModal"
          class="fixed inset-0 bg-black/40 flex items-start justify-center pt-24"
          @click.self="searchToggle"
        >
          <div
            ref="modalRef"
            class="bg-white text-black rounded shadow-lg p-4 min-w-[300px]"
            tabindex="-1"
          >
            <!-- Keep input value while selecting options -->
            <p class="mb-2 text-sm text-gray-700">
              Searching for: <span class="font-semibold">{{ searchTerm }}</span>
            </p>

            <!-- Example selectable options -->
            <ul class="space-y-1">
              <li v-for="option in ['Option A', 'Option B', 'Option C']" :key="option">
                <button
                  class="w-full text-left px-2 py-1 rounded hover:bg-gray-100"
                  @click="
                    () => {
                      /* handle selection, keep searchTerm */
                    }
                  "
                >
                  {{ option }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li>
        <!-- fix: styling of button logout and button component -->
        <Button classes="rounded-sm bg-green-900 px-4 py-1 cursor-pointer" @click="logout"
          >Logout</Button
        >
      </li>
    </ul>
  </nav>
</template>
