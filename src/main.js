import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import components from '@/components'

import App from './App.vue'

const app = createApp(App)
  .use(router)
  .use(store)
  .use(i18n)
  .use(components)

// UI Library: ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import en from 'element-plus/lib/locale/lang/en'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import * as ElIconModules from '@element-plus/icons'
for(let iconName in ElIconModules){
  app.component(iconName, ElIconModules[iconName])
}
app.use(ElementPlus, {
  size: store.state.app.size,
  locale: (function(locale){
    switch(locale) {
      case 'zh-cn':
        return zhCn
      default:
        return en
    }
  }(store.state.app.locale))
})

import { preloadHook } from './hooks'
preloadHook.promise(app).then(() => {
  app.mount('#app')
  document.getElementsByClassName('loading-container')[0].style.display = 'none'
})

import '@/utils/handle-window-resize.js'
import '@/style/index.scss'
