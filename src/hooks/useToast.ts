import { storeToRefs } from "pinia";
import { useToastStore } from "@/stores/toast";

export function useToast() {
  const toastStore = useToastStore()
  const { toasts } = storeToRefs(toastStore)

  return {
    toasts,
    addToast: toastStore.addToast,
    removeToast: toastStore.removeToast,
    success: toastStore.success,
    error: toastStore.error,
    info: toastStore.info,
    warning: toastStore.warning,
  }
}
