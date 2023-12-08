import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://146.19.168.113:4000/api/v1'
// TODO: detect active token (axios.defaults.headers.common.Authorization = 'Bearer ')

createApp(App).use(router).use(store).mount('#app')
