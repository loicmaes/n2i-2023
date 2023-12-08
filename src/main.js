import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// Dev:
// axios.defaults.baseURL = 'http://146.19.168.113:4000/api/v1'
// Prod:
axios.defaults.baseURL = 'https://servers.dotslash.fr:4001/api/v1'

createApp(App).use(router).use(store).mount('#app')
