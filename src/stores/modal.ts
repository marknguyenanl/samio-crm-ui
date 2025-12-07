import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isModalOn = ref("")
  const toggleModal = (label: string, action: string) => {
    if (action === 'close') isModalOn.value = ""
    if (action === 'open') isModalOn.value = label
  }
  return { isModalOn, toggleModal }
})
