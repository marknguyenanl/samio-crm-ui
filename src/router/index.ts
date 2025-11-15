import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "@/pages/Dashboard.vue"
import Homepage from "@/pages/Homepage.vue"
import Docs from "@/pages/Docs.vue"
import Pricing from "@/pages/Pricing.vue"
import Login from "@/auth/Login.vue"
import Register from "@/auth/Register.vue"
import GuestLayout from "@/layouts/GuestLayout.vue"
import DashLayout from "@/layouts/DashLayout.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: GuestLayout,
      children: [
        { path: '', component: Homepage },
        { path: 'docs', component: Docs },
        { path: 'pricing', component: Pricing },
        { path: 'login', component: Login },
        { path: 'register', component: Register },
      ]
    },
    {
      path: '/dashboard',
      component: DashLayout,
      children: [
        { path: '', component: Dashboard }
      ]
    }
  ]
})
