import { createApp } from 'vue'
// 全局样式
import './style/index.less'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from "./router";
// 创建 Pinia 实例
const pinia = createPinia()
const app = createApp(App)

// 挂载到 Vue 根实例
app.use(pinia)
app.use(router)
app.mount('#app')
