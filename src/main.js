import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "@/scss/styles.scss"
import App from '@/App.vue'
import router from '@/plugins/router'
import * as bootstrap from 'bootstrap'

const pinia = createPinia()
createApp(App).use(pinia).use(router).mount('#app')
