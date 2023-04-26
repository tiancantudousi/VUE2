<template>
  <div>
    <!--
      name(必传)：应用名称
      url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html
      baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/my-page`
     -->
     微服务
    <micro-app name='app1' :data='microAppData' url='http://localhost:3101/microAppPage' keep-alive disableSandbox inline @datachange='handleDataChange' @aftershow="aftershow" @created='created' @mounted='mounted'></micro-app>
  </div>
</template>
<script lang="js">
import microApp, { removeDomScope } from '@micro-zoe/micro-app'
import { bus } from '@/main.js'
export default {
  data () {
    return {
      microAppData: {
        pushState: (path) => {
          // console.log('path', path)
          // removeDomScope()
          // this.$router.push(path)
        },
        userData: sessionStorage.userData
      },
      url: ''
    }
  },
  methods: {
    handleDataChange (e) {
      console.log('来自子应用的数据：', e.detail.data)
      const childData = e.detail.data
      if (childData.type === 'router') {
        this.$router.push(childData.routeObj)
      }
      if (childData.type === 'setReportState') {
        bus.$emit('reportState', childData.reportState)
        sessionStorage.setItem('reportState', childData.reportState)
      }
    },
    sendUserData () {
      microApp.setData('app1', { type: 'setUserData', value: sessionStorage.userData })
    },
    created () {
      // microApp.setData('app1', { type: 'setCookie', value: document.cookie })
      // this.sendUserData()
      console.log('micro-app元素被创建')
    },
    beforemount () {
      console.log('即将被渲染，只在初始化时执行一次')
    },
    mounted () {
      // microApp.setData('app1', { type: 'setCookie', value: document.cookie })
      console.log('已经渲染完成，只在初始化时执行一次')
    },
    afterhidden () {
      console.log('已卸载')
    },
    beforeshow () {
      console.log('即将重新渲染，初始化时不执行')
    },
    aftershow () {
      console.log('已经重新渲染，初始化时不执行')
      microApp.setData('app1', { type: 'onActivated' })
    },
    error () {
      console.log('渲染出错')
    }
  }
}
</script>
