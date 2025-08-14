import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n' // 注意这里是 createI18n 而不是 VueI18n

const pinia = createPinia()
const app = createApp(App)
app.use(createPinia())
app.use(createI18n)
app.use(router)
app.mount('#app')

pinia.use(piniaPluginPersistedstate)
