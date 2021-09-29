import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import History from "../views/History.vue";
import PaymentHistory from "../views/PaymentHistory.vue";
import Topup from "../views/Topup.vue";
import Notification from "../views/Notification.vue";
import Auction from "../views/Auction.vue";
import Sale from "../views/Sale.vue";
import Ota from "../views/Ota.vue";
import Dta from "../views/Dta.vue";
import AddAdopt from "../views/AddAdopt.vue";
import PostAdopt from "../views/PostAdopt.vue";

//profile
import HomeUser from "../views/user/Home.vue";
import PostUser from "../views/user/Post.vue";
import AdoptUser from "../views/user/Adopt.vue";
import EditProfile from "../views/user/EditProfile.vue";
//auth
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/auction",
    name: "Auction",
    component: Auction,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/history",
    name: "History",
    component: History,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/sale",
    name: "Sale",
    component: Sale,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/topup",
    name: "Topup",
    component: Topup,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/notification",
    name: "Notification",
    component: Notification,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/ota",
    name: "Ota",
    component: Ota,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/dta",
    name: "Dta",
    component: Dta,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/payment/history",
    name: "PaymentHistory",
    component: PaymentHistory,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/add",
    name: "AddAdopt",
    component: AddAdopt,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/post",
    name: "PostAdopt",
    component: PostAdopt,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },

  {
    path: "/profile/home",
    component: HomeUser,
    meta: {
      layout: "Profile",
    },
  },
  {
    path: "/profile/posts",
    component: PostUser,
    meta: {
      layout: "Profile",
    },
  },
  {
    path: "/profile/Adopt",
    component: AdoptUser,
    meta: {
      layout: "Profile",
    },
  },
  {
    path: "/profile/edit",
    component: EditProfile,
    meta: {
      layout: "Main",
    },
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
