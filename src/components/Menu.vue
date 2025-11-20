<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import Button from './Button.vue'

const { logout } = useAuthStore()
</script>
<template>
  <nav class="items-center flex justify-between mb-2 p-2 px-4 bg-gray-800 text-white">
    <ul class="items-center flex-row flex gap-4">
      <li><RouterLink :to="{ name: 'dashboard' }">CRM</RouterLink></li>
      <li><RouterLink :to="{ name: 'leads' }">Leads</RouterLink></li>
      <li><RouterLink :to="{ name: 'contacts' }">Contacts</RouterLink></li>
    </ul>
    <ul class="items-center flex-row flex gap-4">
      <!-- todo: use modal popup for this -->
      <!-- fix: fix this searchicon -->
      <li>SearchIcon</li>
      <li>
        <Button classes="rounded-sm bg-green-900 px-4 py-1 cursor-pointer" @click="logout"
          >Logout</Button
        >
      </li>
    </ul>
  </nav>
</template>
