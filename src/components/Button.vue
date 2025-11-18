<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{ classes: string }>()
</script>
<template>
  <button @click="$emit('click')" :class="['px-4 bg-black', props.classes]"><slot /></button>
</template>
