import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import History from '../views/History.vue'
import PaymentHistory from '../views/PaymentHistory.vue'
import Topup from '../views/Topup.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User/id.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: "Main",
    },
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: {
      layout: "Main",
    },
  },
  {
    path: '/topup',
    name: 'Topup',
    component: Topup,
    meta: {
      layout: "Main",
    },
  },
  {
    path: '/payment/history',
    name: 'PaymentHistory',
    component: PaymentHistory,
    meta: {
      layout: "Main",
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/user/:id',
    component: User,
    meta: {
      layout: "Profile",
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
