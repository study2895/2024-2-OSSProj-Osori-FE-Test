import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/styles/global.css'

createApp(App).use(store).use(router).mount('#app')
