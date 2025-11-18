<script setup>
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/Button.vue'

const { logout } = useAuthStore()
</script>

<template>
  <!-- fix: styling of button logout and button component -->
  <div class="bg-red-800">New Dashboard here</div>
  <Button classes="px-4 py-1 cursor-pointer" @click="logout">Logout new</Button>
</template>
