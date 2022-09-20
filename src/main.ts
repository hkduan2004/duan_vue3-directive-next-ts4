import { createApp, App } from 'vue'
import AppView from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './config/app';
import { ElButton } from 'element-plus'
import 'element-plus/dist/index.css'
import "../node_modules/duan_vue3-directive-next-ts3/lib/style.css"
import directive from 'duan_vue3-directive-next-ts3'
// import "../node_modules/@yangchanghao/vue-directive-next/style.css"
// import directive from '@yangchanghao/vue-directive-next'

const app: App = createApp(AppView);


app.use(createPinia())
app.use(router)
app.use(directive)
app.use(ElButton)
app.mount('#app')