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

const menuPopup = ref(false)
</script>
<template>
  <nav
    class="sticky top-0 z-30 md:items-center flex justify-between p-2 px-4 bg-samio-butter-light shadow-lg text-samio-green"
  >
    <ul class="tablet hidden md:items-center md:flex-row md:flex md:gap-8">
      <li class="pb-2">
        <RouterLink :to="{ name: 'dashboard' }">
          <img class="h-14 object-cover" src="/logo-only.svg" alt="AnrosTech logo" />
        </RouterLink>
      </li>
      <!-- <li -->
      <!--   class="hover:border-b-2 hover:border-[#f97300] transition-colors ease-in-out duration-500 border-b-0 border-green-50" -->
      <!-- > -->
      <!--   <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink> -->
      <!-- </li> -->
      <li
        class="hover:border-b-2 hover:border-samio-orange transition-colors ease-in-out duration-500 border-b-0 border-green-50"
      >
        <RouterLink :to="{ name: 'contacts' }">Contacts</RouterLink>
      </li>
      <!-- <li -->
      <!--   class="hover:border-b-2 hover:border-[#f97300] transition-colors ease-in-out duration-500 border-b-0 border-green-50" -->
      <!-- > -->
      <!--   <RouterLink :to="{ name: 'contacts' }">Contacts</RouterLink> -->
      <!-- </li> -->
      <!-- <li class='hover:border-b-2 transition-all  hover:border-[#f97300]'><RouterLink :to="{ name: 'contacts' }">Social</RouterLink></li> -->
    </ul>

    <!-- TODO: Implement feature search once the database is ready -->

    <ul class="tablet hidden items-center flex-row md:flex gap-4">
      <li hidden>
        <img
          @click="searchToggle"
          v-if="!isSearching"
          src="@/icons/search.svg"
          alt="Search"
          class="w-8 aspect-square"
        />
        <label
          v-if="isSearching"
          class="hidden px-2 rounded-sm py-1 bg-white md:flex flex-row items-center"
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
        <Button variant="accent" @click="logout">Logout</Button>
      </li>
    </ul>

    <ul class="mobile items-center flex-row flex md:hidden w-full justify-between gap-8">
      <li class="pb-2">
        <RouterLink :to="{ name: 'dashboard' }">
          <img class="h-14 object-cover" src="/logo-only.svg" alt="AnrosTech logo" />
        </RouterLink>
      </li>
      <li class="cursor-pointer pb-2" @click="menuPopup = !menuPopup">
        <i class="fa fa-bars" aria-hidden="true"></i>
        <transition name="menu">
          <ul
            class="py-4 flex flex-col rounded-b-md bg-samio-butter-light h-fit fixed top-0 left-0 w-full z-100"
            v-if="menuPopup"
          >
            <li
              class="px-4 py-2 hover:bg-samio-orange transition-colors ease-in-out duration-500 border-b-0 border-green-50"
            >
              <RouterLink :to="{ name: 'contacts' }">Contacts</RouterLink>
            </li>
            <li
              class="px-4 py-2 hover:bg-samio-orange transition-colors ease-in-out duration-500 border-b-0 border-green-50"
            >
              <RouterLink :to="{ name: 'contacts' }">Socials</RouterLink>
            </li>
          </ul>
        </transition>
        <transition name="fade">
          <div
            class="fixed z-50 top-0 left-0 h-full w-full bg-gray-900 opacity-50"
            v-if="menuPopup"
          ></div>
        </transition>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
