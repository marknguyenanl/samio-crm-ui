import { onBeforeUnmount, ref } from 'vue'
export default function useDebounce(delay = 250) {
  const timer = ref<ReturnType<typeof setTimeout> | null>(null)

  const debounceTimer = (fn: () => void | Promise<void>) => {
    if (timer.value !== null) clearTimeout(timer.value)

    timer.value = setTimeout(() => {
      fn()
    }, delay);
  }
  onBeforeUnmount(() => {
    if (timer.value !== null) {
      clearTimeout(timer.value)
    }
  })
  return { debounceTimer }
}
