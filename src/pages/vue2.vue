<template>
  <div>
      <!--
    name(必传)：应用名称
    url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html
    baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/my-page`
   -->
      <!-- <micro-app name='app1' :data='microAppData' url="https://ssa-sit.onewo.com/turbo/" keep-alive  inline @created='created' @mounted='mounted'></micro-app> -->
      <!-- url="http://localhost:3100/turbo/" -->
      <micro-app name='app1' :data='microAppData' keep-alive url='http://localhost:3101/microAppPage' disableSandbox inline  @aftershow="aftershow" @created='created' @mounted='mounted'></micro-app>
  </div>
</template>
<script lang="js">

export default {
data () {
  return {
    microAppData: {
      pushState: (path) => {
        console.log('path', path)
        // removeDomScope()
        this.$router.push(path)
      }
    },
    showMicroApp: true,
  }
},
methods: {
  sendData() {
    console.log('sendData: ');
    // microApp.setData('app1', { type: 'setCookie', value: document.cookie })
  },
  created () {
    // microApp.setData('app1', { type: 'setCookie', value: document.cookie })
    console.log('micro-app元素被创建1111')
    // window['__MICRO_APP_ENVIRONMENT__']=true
    console.log('window: ', window);
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
    // 监听keep-alive模式下的应用状态
window.addEventListener('appstate-change', function (e) {
console.log('appstate-change e: ', e);
if (e.detail.appState === 'afterhidden') {
  console.log('已卸载')
} else if (e.detail.appState === 'beforeshow') {
  console.log('即将重新渲染')
} else if (e.detail.appState === 'aftershow') {
  console.log('已经重新渲染')
}
})


  },
  aftershow () {
    console.log('已经重新渲染，初始化时不执行121')
  },
  error () {
    console.log('渲染出错')
  }
}
}
</script>
