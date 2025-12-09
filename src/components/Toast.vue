<script setup>
import { useToast } from '@/hooks/useToast'

const { toasts, removeToast } = useToast()
</script>
<template>
  <div class="fixed top-14 right-10" v-if="toasts && toasts.length">
    <div
      :class="[
        'flex flex-col gap-8 rounded-lg w-fit h-fit py-2 px-4 border-samio-orange-dark bg-samio-butter-light text-samio-green border',
        toast.type === 'error' ? 'border-red-500' : 'border-green-500',
      ]"
      v-for="toast in toasts"
      :key="toast.id"
      @click="removeToast(toast.id)"
    >
      <p>{{ toast.message }}</p>
    </div>
  </div>
</template>
