import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
// import { api } from '@/api/axios'

import App from './App.vue'

const app = createApp(App)

// app.use(api)
app.use(router)
app.use(createPinia())

app.mount('#app')
