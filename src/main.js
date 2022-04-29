import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import store from'./store/index.js'
import router from './router/index.js'
import './assets/iconfont.css'
import "./assets/iconfont.js"
import plugins from './utils/plugins.js'
import SvgIcon from './components/SvgIcon.vue'

const app = createApp(App)
app.use(naive)
app.use(plugins)
// 将 store 实例作为插件安装
app.use(store)
app.use(router)
app.component('svg-icon', SvgIcon)

app.mount('#app')


