import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'animate.css'
import {i18n} from '@/assets/languages/index'

const app = createApp(App)
app.use(i18n)
app.use(store).use(router).mount('#app')
