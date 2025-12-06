<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      baseClasses,
      sizeClasses,
      scaleClasses,
      variantClasses,
      customClasses,
      full ? 'w-full' : '',
      disabled || loading ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
    ]"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <svg v-if="loading" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
      />
    </svg>

    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['click'])
const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // primary | accent | secondary | soft
  },
  size: {
    type: String,
    default: 'md', // sm | md | lg
  },
  scale: {
    type: String,
    default: 'md', // sm | md | lg
  },
  custom: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  full: {
    type: Boolean,
    default: false,
  },
})

const baseClasses =
  'inline-flex items-center justify-center font-medium rounded-lg transition focus:outline-none'

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'accent':
      return 'bg-samio-orange hover:bg-samio-orange-dark text-white'
    case 'secondary':
      return 'border border-samio-green text-samio-green hover:bg-samio-cream'
    case 'soft':
      return 'bg-samio-gold hover:bg-samio-gold-dark text-samio-green'
    case 'text':
      return 'hover:text-samio-gold-dark text-samio-green italic'
    default: // primary
      return 'bg-samio-green hover:bg-samio-green-dark text-white'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'md':
      return 'px-3 py-1.5 text-sm'
    case 'lg':
      return 'px-6 py-3 text-base'
    default: // sm
      return 'text-sm'
  }
})

const scaleClasses = computed(() => {
  switch (props.scale) {
    case 'sm':
      return 'transform scale-95'
    case 'lg':
      return 'transform scale-110'
    case 'hover-md':
      return 'transform origin-bottom-left hover:scale-105'
    case 'hover-lg':
      return 'transform origin-bottom-left hover:scale-110'
    default: //sm
      return 'transform hover:scale-100'
  }
})

const customClasses = computed(() => {
  return props.custom
})

const handleClick = (e) => {
  emit('click', e)
}
</script>
