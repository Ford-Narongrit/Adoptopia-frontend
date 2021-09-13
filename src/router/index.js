import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User/id.vue'
import Auction from '../views/Auction.vue'
import Sale from '../views/Sale.vue'
import Ota from '../views/Ota.vue'
import Dta from '../views/Dta.vue'

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
    path: '/auction',
    name: 'Auction',
    component: Auction,
    meta: {
      layout: "Main",
    },
  },
  {
    path: '/sale',
    name: 'Sale',
    component: Sale,
    meta: {
      layout: "Main",
    },
  },
  {
    path: '/ota',
    name: 'Ota',
    component: Ota,
    meta: {
      layout: "Main",
    },
  },
  {
    path: '/dta',
    name: 'Dta',
    component: Dta,
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
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
