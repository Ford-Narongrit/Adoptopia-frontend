import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import History from "../views/History.vue";
import PaymentHistory from "../views/PaymentHistory.vue";
import Topup from "../views/Topup.vue";
import Notification from "../views/Notification.vue";
import Sale from "../views/Sale.vue";
import Ota from "../views/Ota.vue";
import OtaSug from "../views/OtaSug.vue";
import OtaSelect from "../views/OtaSelect.vue";
import Dta from "../views/Dta.vue";
import DtaSug from "../views/DtaSug.vue";
import AddAdop from "../views/AddAdop.vue";
import PostAdopt from "../views/PostAdopt.vue";
import PostSelect from "../views/PostSelect.vue";

//profile
import HomeUser from "@/views/user/Home.vue";
import PostUser from "@/views/user/Post.vue";
import AdopUser from "@/views/user/Adop.vue";
import EditProfile from "@/views/user/EditProfile.vue";
import AdopIDUser from "@/views/user/Adop_id.vue";
//auth
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

//follow
import Follower from "@/views/user/followers.vue";
import Following from "@/views/user/following.vue";

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
    path: "/history",
    name: "History",
    component: History,
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
    path: "/sale/:id",
    name: "sale",
    component: Sale,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/ota/:id",
    name: "ota",
    component: Ota,
    props: true,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/ota-sug/:id",
    name: "OtaSug",
    component: OtaSug,
    props: true,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/ota-select/:id",
    name: "OtaSelect",
    component: OtaSelect,
    props: true,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/dta/:id",
    name: "dta",
    component: Dta,
    props: true,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/dta-sug/:id",
    name: "DtaSug",
    component: DtaSug,
    props: true,
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
    path: "/adop/add",
    name: "AddAdop",
    component: AddAdop,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/post",
    name: "PostAdopt",
    component: PostAdopt,
    props: true,
    meta: {
      layout: "Main",
    },
  },
  {
    path: "/post-select",
    name: "PostSelect",
    component: PostSelect,
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
    path: "/profile/adop",
    component: AdopUser,
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
  {
    path: "/profile/adop/:id",
    component: AdopIDUser,
    meta: {
      layout: "Image",
    },
  },
  {
    path: "/:slug/followers",
    component: Follower,
    meta: {
      layout: "Follow",
    },
  },
  {
    path: "/:slug/following",
    component: Following,
    meta: {
      layout: "Follow",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
