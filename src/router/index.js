// 路由映射关系表
import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由懒加载
const Login = () => import('views/login/')
const Layout = () => import('views/layout/')
const Home = () => import('views/home/')
const Custome = () => import('views/custome/')
const BasicConfig = () => import('views/basicConfig/')
const Profile = () => import('views/profile/')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/custome',
        name: 'custome',
        component: Custome
      },
      {
        path: '/config',
        name: 'config',
        component: BasicConfig
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
