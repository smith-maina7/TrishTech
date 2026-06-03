import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// TanStack Vue Query setup
const queryClient = new QueryClient()
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
