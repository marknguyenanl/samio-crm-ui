import { defineStore } from "pinia"
import { reactive } from "vue"

export const useAccountStore = defineStore('account', () => {
  const account = reactive({
    name: "Anros",
    leads: true,
    contacts: true,
    deals: true,
    activities: true,
    quotes: false,
    accounts: false,
    orders: false,
    purchase: false,
    invoices: false,
    reports: false,
  });
  const leads = reactive({
    enabled: true
  })
  const contacts = reactive({
    enabled: true
  })
  const deals = reactive({
    enabled: true
  })
  const activitties = reactive({
    enabled: true
  })


  return { account }
})
