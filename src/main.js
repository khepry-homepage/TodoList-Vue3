import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/iconfont.css'
import "@/assets/iconfont.js"

import SvgIcon from './components/SvgIcon.vue'
import { store, router, plugins } from './utils/index.js'

import {
  // create naive ui
  create,
  // component
  NButton,
  NDrawer,
  NDrawerContent,
  NModal,
  NForm,
  NFormItem,
  NSpace,
  NScrollbar,
  NCard,
  NDatePicker,
  NDivider,
  NAvatar,
  NInput,
  NEllipsis,
  NInputNumber,
  NRadio,
  NRadioGroup,
  NSelect,
  NCheckbox,
  NCheckboxGroup,
  NSwitch,
  NUpload,
  NMessageProvider,
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NLayoutSider,
  NGrid,
  NGridItem,
  NTooltip,
  NPopconfirm,
  NProgress,
} from 'naive-ui'

const naive = create({
  components: [
    NButton,
    NDrawer,
    NDrawerContent,
    NModal,
    NForm,
    NFormItem,
    NSpace,
    NScrollbar,
    NCard,
    NDatePicker,
    NDivider,
    NAvatar,
    NInput,
    NEllipsis,
    NInputNumber,
    NRadio,
    NRadioGroup,
    NSelect,
    NCheckbox,
    NCheckboxGroup,
    NSwitch,
    NUpload,
    NMessageProvider,
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NLayoutSider,
    NGrid,
    NGridItem,
    NTooltip,
    NPopconfirm,
    NProgress,
  ]
})

const app = createApp(App)
app.use(naive)
app.use(plugins)
// 将 store 实例作为插件安装
app.use(store)
app.use(router)
app.component('svg-icon', SvgIcon)

app.mount('#app')


