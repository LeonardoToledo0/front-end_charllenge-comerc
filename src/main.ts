import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTheMask from 'vue-the-mask'

import './index.css'
import App from './App.vue'
import router from './routes/routes'

const app = createApp(App)


const pinia = createPinia()


app.use(pinia)


app.use(router)
app.use(VueTheMask)

app.mount('#app')


export { pinia }
