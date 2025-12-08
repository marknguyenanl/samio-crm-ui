import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: number;
  message: string;
  type: ToastType
}

let idCounter = 0
export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  const addToast = (message: string, type: ToastType = 'info', duration = 3000) => {
    const id: number = idCounter++
    toasts.value.push({ id, message, type })
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration);
    }
  }

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const success = (message: string, duration = 3000) => {
    addToast(message, 'success', duration)
  }
  const error = (message: string, duration = 3000) => {
    addToast(message, 'error', duration);
  };

  const info = (message: string, duration = 3000) => {
    addToast(message, 'info', duration);
  };

  const warning = (message: string, duration = 3000) => {
    addToast(message, 'warning', duration);
  };
  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning
  }
})

