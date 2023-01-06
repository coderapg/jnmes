// 路由映射关系表
import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由懒加载
const Login = () => import('../views/login/')
const Layout = () => import('../views/layout/')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    component: Layout
  }
]

const router = new VueRouter({
  routes
})

export default router
