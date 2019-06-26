import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import router from './router'
import 'nprogress/nprogress.css'
import axios from 'axios'

//配置axios的基础路径，发送请求的时候就不需要每次都在写前缀路径了
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0'


//所有组件都是Vue的实例，把在组件中频繁使用的成员放在vue.prototype中

Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
