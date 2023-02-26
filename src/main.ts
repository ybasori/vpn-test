import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import type { IStore } from './store/store.type'
import authModule from './store/auth/auth'
import registerModule from './store/register/register'
import productModule from './store/product/product'

import './assets/main.css'

const app = createApp(App)

const store = createStore<IStore>({
  modules: {
    auth: authModule,
    register: registerModule,
    product: productModule
  }
})

app.use(store)

app.use(router)

app.mount('#app')
