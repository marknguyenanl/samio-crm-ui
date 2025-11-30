import Login from "@/auth/Login.vue"
import Register from "@/auth/Register.vue"
import DashLayout from "@/layouts/DashLayout.vue"
import GuestLayout from "@/layouts/GuestLayout.vue"
import Account from "@/pages/Dashboard/Account.vue"
import Contacts from "@/pages/Dashboard/Contacts.vue"
import Leads from "@/pages/Dashboard/Leads.vue"
import Dashboard from "@/pages/Dashboard/index.vue"
import Docs from "@/pages/Welcome/Docs.vue"
import Homepage from "@/pages/Homepage.vue"
import Pricing from "@/pages/Welcome/Pricing.vue"
import { createRouter, createWebHistory } from "vue-router"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: GuestLayout,
      meta: { guest: true },
      children: [
        {
          path: '',
          name: 'home',
          component: Homepage
        },
        {
          path: 'docs',
          name: 'docs',
          component: Docs
        },
        {
          path: 'pricing',
          name: 'pricing',
          component: Pricing
        },
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        },
      ],
    },
    {
      path: '/dashboard',
      component: DashLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'account',
          name: 'account',
          component: Account
        },
        {
          path: 'contacts',
          name: 'contacts',
          component: Contacts
        },
        {
          path: 'leads',
          name: 'leads',
          component: Leads
        }
      ]
    }
  ]
})

router.beforeEach((to, from) => {
  const token = localStorage.getItem("access_token")
  if (to.meta.requiresAuth && !token) return { name: 'login' }
  if (to.meta.guest && token) return { name: 'dashboard' }
  return true
})
