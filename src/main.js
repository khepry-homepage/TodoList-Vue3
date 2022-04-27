import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import './assets/iconfont.css'
import plugins from './utils/plugins.js'
const app = createApp(App)
app.use(naive)
app.use(plugins)
app.mount('#app')
