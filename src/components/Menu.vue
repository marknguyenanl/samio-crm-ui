<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import Button from './Button.vue'

const { logout } = useAuthStore()
</script>
<template>
  <nav class="items-center flex justify-between mb-2 p-2 px-4 bg-gray-800 text-white">
    <ul class="items-center flex-row flex gap-8">
      <li class="pb-2">
        <RouterLink :to="{ name: 'dashboard' }">
          <img class="h-14 object-cover" src="/Logo-white.svg" alt="AnrosTech logo" />
        </RouterLink>
      </li>
      <li><RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink></li>
      <li><RouterLink :to="{ name: 'leads' }">Leads</RouterLink></li>
      <li><RouterLink :to="{ name: 'contacts' }">Contacts</RouterLink></li>
      <li><RouterLink :to="{ name: 'contacts' }">Social</RouterLink></li>
    </ul>
    <ul class="items-center flex-row flex gap-4">
      <!-- todo: use modal popup for this -->
      <!-- fix: fix this searchicon -->
      <li>SearchIcon</li>
      <li>
        <!-- fix: styling of button logout and button component -->
        <Button classes="rounded-sm bg-green-900 px-4 py-1 cursor-pointer" @click="logout"
          >Logout</Button
        >
      </li>
    </ul>
  </nav>
</template>
