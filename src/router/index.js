import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import History from "../views/History.vue";
import PaymentHistory from "../views/PaymentHistory.vue";
import Topup from "../views/Topup.vue";
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
import AdopUser from "@/views/user/Adop.vue";
import EditProfile from "@/views/user/EditProfile.vue";
import AdopIDUser from "@/views/user/Adop_id.vue";
//auth
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

//follow
import Follower from "@/views/user/followers.vue";
import Following from "@/views/user/following.vue";

//Admin
import ReportPost from "@/views/admin/ReportPost.vue";
import ReportUser from "@/views/admin/ReportUser.vue";
import BanList from "@/views/admin/BanList.vue";

//store
import User from "@/store/User";
import Alert from "@/helpers/Alert";
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
      requiresAuth: true,
    },
  },
  {
    path: "/topup",
    name: "Topup",
    component: Topup,
    meta: {
      layout: "Main",
      requiresAuth: true,
    },
  },
  {
    path: "/sale/:id",
    name: "sale",
    component: Sale,
    meta: {
      layout: "Main",
      requiresAuth: true,
    },
  },
  {
    path: "/ota/:id",
    name: "ota",
    component: Ota,
    props: true,
    meta: {
      layout: "Main",
      requiresAuth: true,
    },
  },
  {
    path: "/ota-sug/:id",
    name: "OtaSug",
    component: OtaSug,
    props: true,
    meta: {
      layout: "Main",
      requiresAuth: true,
    },
  },
  {
    path: "/ota-select/:id",
    name: "OtaSelect",
    component: OtaSelect,
    props: true,
    meta: {
      layout: "Main",
      requiresAuth: true,
    },
  },
  {
    path: "/dta/:id",
    name: "dta",
    component: Dta,
    props: true,
    meta: {
      layout: "Main",
      requiresAuth: true,
    },
  },
  {
    path: "/dta-sug/:id",
    name: "DtaSug",
    component: DtaSug,
    props: true,
    meta: {
      layout: "Main",
      requiresAuth: true,
    },
  },
  {
    path: "/payment/history",
    name: "PaymentHistory",
    component: PaymentHistory,
    meta: {
      layout: "Main",
      requiresAuth: true,
    },
  },
  {
    path: "/adop/add",
    name: "AddAdop",
    component: AddAdop,
    meta: {
      layout: "Main",
      requiresAuth: true,
    },
  },
  {
    path: "/post",
    name: "PostAdopt",
    component: PostAdopt,
    props: true,
    meta: {
      layout: "Main",
      requiresAuth: true,
    },
  },
  {
    path: "/post-select",
    name: "PostSelect",
    component: PostSelect,
    meta: {
      layout: "Main",
      requiresAuth: true,
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
    path: "/:username/home",
    component: HomeUser,
    meta: {
      layout: "Profile",
    },
  },
  {
    path: "/:username/adop",
    component: AdopUser,
    meta: {
      layout: "Profile",
      requiresAuth: true,
    },
  },
  {
    path: "/:username/edit",
    component: EditProfile,
    meta: {
      layout: "Main",
      requiresAuth: true,
    },
  },
  {
    path: "/:username/adop/:id",
    component: AdopIDUser,
    meta: {
      layout: "Image",
      requiresAuth: true,
    },
  },
  {
    path: "/:username/followers",
    component: Follower,
    meta: {
      layout: "Follow",
    },
  },
  {
    path: "/:username/following",
    component: Following,
    meta: {
      layout: "Follow",
    },
  },
  {
    path: "/admin/report-post",
    component: ReportPost,
    meta: {
      layout: "Admin",
      requiresAuth: true,
    },
  },
  {
    path: "/admin/report-user",
    component: ReportUser,
    meta: {
      layout: "Admin",
      requiresAuth: true,
    },
  },
  {
    path: "/admin/ban-list",
    component: BanList,
    meta: {
      layout: "Admin",
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!User.getters.isAuthen) {
      Alert.window(
        "warning",
        "warning",
        "You need to sign in to user this feature"
      );
      next({ name: "Login" });
    } else {
      next();
    }
  }
  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (!User.getters.isAdmin) {
      Alert.window("warning", "warning", "You are not admin");
      next({ name: "Home" });
    }
  } else {
    if (
      User.getters.isAuthen &&
      (to.name === "Login" || to.name === "Register")
    ) {
      next({ name: "Home" });
    } else {
      next();
    }
  }
});
export default router;
