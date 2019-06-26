import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import { getUser } from '@/utils/auth' 

Vue.use(Router)


const router = new Router({
  routes: [
    // {
    //   name: 'home',
    //   path: '/',
    //   component: () => import('@/views/home/index.vue')
    // },
    {
        // name: 'layout',  //使用js命名路由导航不会渲染子路由
        path: '/',
        component: () => import('@/views/layout'),
        children: [
          {
            name: 'home',
            path: '', // 父路由的默认内容
            component: () => import('@/views/home/index.vue')
          },
          {
            name: 'publish',
            path: '/publish',
            component: () => import('@/views/publish')
          }
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/index.vue')
    }

  ]
})

router.beforeEach((to, from, next) => {
  // next()
  nprogress.start()
// const userInfo = window.localStorage.getItem('user_info')
const userInfo = getUser()
if(to.path !=='/login') {
  //非登录页面
  //没有登录，跳转到登录页
  if (!userInfo) {
 next ({name: 'login'})
  } else {
    //登录了，允许通过
    next()
  }
}else {
  //登录页面
  if(!userInfo){
    //没有登录，允许通过 
    next()
  } else {
    // 登录了，不允许通过
    // next(false)  //中断当前导航
    // next ()
    // next ({name: 'home'})
    window.location.href = '/#/'
    window.location.reload()

  }
}
})

router.afterEach((to, from) => {
nprogress.done()
})
export default  router