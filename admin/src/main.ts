import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import Element3 from 'element3'
import router from '@/router'

import './style.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

// pinia ---

pinia.use(piniaPersist)

// app --

app.use(router)
app.use(pinia)
app.use(Element3, { size: 'small', zIndex: 3000 })
app.mount('#app')