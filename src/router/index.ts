import Login from "@/auth/Login.vue"
import Register from "@/auth/Register.vue"
import DashLayout from "@/layouts/DashLayout.vue"
import GuestLayout from "@/layouts/GuestLayout.vue"
import Account from "@/pages/Dashboard/Account.vue"
import Contacts from "@/pages/Dashboard/Contacts.vue"
import Dashboard from "@/pages/Dashboard/index.vue"
import Leads from "@/pages/Dashboard/Leads/index.vue"
import LeadDetail from "@/pages/Dashboard/Leads/LeadDetail.vue"
import Docs from "@/pages/Welcome/Docs.vue"
import Homepage from "@/pages/Welcome/Homepage.vue"
import Pricing from "@/pages/Welcome/Pricing.vue"
import DemoLogin from "@/pages/Welcome/DemoLogin.vue"
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
        {
          path: 'demo',
          name: 'demo',
          component: DemoLogin
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
        },
        {
          path: 'leads/:id',
          name: 'leaddetail',
          component: LeadDetail
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
