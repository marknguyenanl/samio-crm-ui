import { ref } from 'vue'
const timer = ref<number | null>(null)
export default function useDebounce() {

  const debounceTimer = () => {

  }
  return { debounceTimer }
}
