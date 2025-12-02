import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import { createI18n } from 'vue-i18n'
import '@/global.css'

import App from './App.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'vn',
  fallbackLocale: 'en',
  messages: {
    en: {
      mesasge: {
        hello: 'hello world',
      },
    },
    vn: {
      message: {
        hello: 'Xin chào',
      },
    },
  },
})
const app = createApp(App)
// TODO: translate to vietnamese
app.use(i18n)
app.use(router)
app.use(createPinia())

app.mount('#app')
