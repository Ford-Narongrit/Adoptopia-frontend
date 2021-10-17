<template>
  <div
    class="sticky top-0 flex justify-between items-center bg-shark-500 py-3 px-10 z-50"
    :class="showNavbar ? 'navbar--show' : 'navbar--hidden'"
  >
    <!-- Logo -->
    <div>
      <router-link to="/" class="flex items-center space-x-2">
        <img src="@/assets/logo.png" alt="Logo" title="Adoptopia" class="h-8" />
        <div class="text-white text-2xl">Adoptopia</div>
      </router-link>
    </div>

    <!-- menu -->
    <div class="flex items-center space-x-4">
      <div class="text-white text-xl" v-if="login">
        <router-link
          to="/topup"
          class="border-b-2 border-transparent"
          v-if="user.coin <= 1"
          >{{ user.coin }} Coin</router-link
        >
        <router-link to="/topup" class="border-b-2 border-transparent" v-else
          >{{ user.coin }} Coins</router-link
        >
      </div>
      <div class="nav text-white text-xl">
        <router-link
          to="/"
          class="border-b-2 border-transparent hover:border-blue-500"
          >Trade</router-link
        >
      </div>
      <div class="nav text-white text-xl" v-if="login">
        <router-link
          to="/post"
          class="border-b-2 border-transparent hover:border-blue-500"
          >Post</router-link
        >
      </div>
      <div class="text-white text-xl hover:border-blue-400" v-if="!login">
        <router-link
          to="/login"
          class="p-2 border-b-2 border-transparent hover:border-blue-500"
        >
          Login
        </router-link>
      </div>
      <div v-if="login">
        <router-link
          to="/notification"
          class="p-2 border-b-2 border-transparent relative inline-block"
        >
          <span
            v-if="notificationNumber > 0"
            class="absolute text-white -top-1  left-5 bg-red-500 rounded-full h-5  w-5 flex items-center justify-center"
            >{{ notificationNumber }}</span
          >
          <font-awesome-icon icon="bell" class="text-xl text-white" />
        </router-link>
      </div>
      <!-- if login -->
      <div v-if="login" class="relative">
        <button @click="isOpen = !isOpen">
          <img
            :src="getImagePath(user.profile)"
            :title="user.name"
            class=" object-cover w-10 h-10 rounded-full shadow-lg border-4 border-gray-900 bg-white"
          />
        </button>
        <button
          v-if="isOpen"
          @click="isOpen = false"
          class="fixed h-screen w-full bg-black inset-0 opacity-30 cursor-default"
        ></button>

        <!-- dropdown -->
        <div
          v-if="isOpen"
          class="bg-gray-200 absolute rounded-xl right-0 py-4 px-5"
        >
          <router-link
            :to="`/${user.username}/home`"
            class="block truncate"
            :title="user.username"
            ><div class="px-3">Login as</div>
            <span class="hover:underline">
              @ {{ user.username }}
            </span></router-link
          >
          <div class="border-b-2 border-gray-400 mx-2 my-1"></div>
          <router-link
            :to="`/${user.username}/adop`"
            class="block px-3 py-2 hover:bg-gray-300 rounded-xl text-center"
            >My Adop</router-link
          >
          <router-link
            to="/adop/add"
            class="block px-3 py-2 hover:bg-gray-300 rounded-xl text-center"
            >Add Adop</router-link
          >
          <router-link
            to="/history"
            class="block px-8 py-2 hover:bg-gray-300 rounded-xl text-center"
            >History</router-link
          >
          <div class="border-b-2 border-gray-400 mx-2 my-1"></div>
          <button
            class="block w-full px-8 py-2 hover:bg-gray-300 rounded-xl text-center"
            @click="logout()"
          >
            Logout
          </button>
        </div>
      </div>
      <div class="nav text-white text-xl" v-if="user.role === 'ADMIN'">
        <router-link
          to="/admin/report-post"
          class="border-b-2 border-transparent hover:border-blue-500 bg-blue-900 rounded-xl"
          ><font-awesome-icon icon="user-shield" class="text-xl text-white" /> Admin</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import UserStore from "@/store/User";
import Alert from "@/helpers/Alert.js";
import axios from "axios";
import Header from "@/helpers/Header";
export default {
  data() {
    return {
      login: false,
      isOpen: false,
      showNavbar: true,
      ontopNavbar: true,
      lastScrollPosition: 0,
      user: {},
      notificationNumber: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    this.login = UserStore.getters.isAuthen;
    this.fetchUser();
    this.fetchNotification();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      // Get the current scroll position
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
      if (currentScrollPosition < 0) {
        return;
      }
      if (currentScrollPosition == 0) {
        this.ontopNavbar = true;
        return;
      }
      this.ontopNavbar = false;
      // Here we determine whether we need to show or hide the navbar
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.isOpen = false;
      // Set the current scroll position as the last scroll position
      this.lastScrollPosition = currentScrollPosition;
    },
    async logout() {
      try {
        let res = await UserStore.dispatch("logout");
        Alert.mixin("success", res.data.message);
        this.$router.push("/login");
      } catch (error) {
        console.error(error.message);
      }
    },
    async fetchUser() {
      try {
        let res = await UserStore.dispatch("getMe");
        this.user = res.data;
      } catch (error) {
        console.error(error.message);
      }
    },
    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },
    async fetchNotification() {
      try {
        let config = Header.getHeaders();
        let res = await axios.get("/notification/me/unseen", config);
        this.notificationNumber = res.data.length;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss">
.navbar--hidden {
  transition: 0.3s all ease-out;
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
  border-bottom: 1px solid;
  border-color: #272727;
}
.navbar--show {
  transition: 0.2s all ease-in;
  box-shadow: none;
  transform: translate3d(0, 0, 0);
  border-bottom: 1px solid;
  border-color: #ffffff;
}
.trans--hidden {
  animation: tran 0.4s;
}
@keyframes tran {
  from {
    background-color: black;
    opacity: 0.8;
  }
  to {
    background-color: transparent;
  }
}
.nav {
  a {
    padding: 0.5rem;
    &.router-link-exact-active {
      color: #60a5fa;
      border-block-color: #60a5fa;
      border-bottom-width: 2px;
    }
  }
  .notify-bubble {
    position: absolute;
    top: -8px;
    right: -7px;
    padding: 2px 5px 2px 6px;
    background-color: green;
    color: white;
    font-size: 0.65em;
    border-radius: 50%;
    box-shadow: 1px 1px 1px gray;
    // display: none;
  }
}
</style>
