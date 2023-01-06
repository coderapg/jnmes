// 路由映射关系表
import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由懒加载
const Login = () => import('../views/login/index')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
