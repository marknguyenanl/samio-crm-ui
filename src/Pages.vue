<script setup lang="ts">
import Toast from './components/Toast.vue'
</script>
<template>
  <RouterView />
  <Transition
    enter-active-class="transition-all duration-1000"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-1000"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <Toast />
  </Transition>
</template>
