import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import History from '../views/History.vue'
import PaymentHistory from '../views/PaymentHistory.vue'

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
    path: '/payment/history',
    name: 'PaymentHistory',
    component: PaymentHistory,
    meta: {
      layout: "Main",
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
