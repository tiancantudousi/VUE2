import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import VueRouter from 'vue-router'
import microApp, { EventCenterForMicroApp } from '@micro-zoe/micro-app'// 微服务
window.eventCenterForViteApp1 = new EventCenterForMicroApp('app1')

Vue.config.productionTip = false

microApp.start({
  plugins: {
    modules: {
      // appName即应用的name值
      app1: [
        {
          loader(code) {
            if (process.env.NODE_ENV === 'development') {
            // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
              code = code.replace(/(from|import)(\s*['"])(\/microAppPage\/)/g, all => {
                return all.replace('/microAppPage/', 'http://localhost:3101/microAppPage/')
              })
            }
            return code
          }
        }
      ]
    }
  }
})

const router = new VueRouter({
  mode: 'history',
  // 设置主应用基础路由为main-vue2(用于后续部署)，则子应用基础路由(baseroute)为/main-vue2/xxx
  base: process.env.BASE_URL,
  routes,
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
