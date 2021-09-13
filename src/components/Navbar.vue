<template>
  <div
    class="sticky top-0 flex justify-between items-center bg-shark-500 py-3 px-10 z-50"
    :class="showNavbar ? 'navbar--show' : 'navbar--hidden'"
  >
    <!-- Logo -->
    <div>
      <router-link to="/" class="flex items-center space-x-2">
        <img
          src="../assets/logo.png"
          alt="Logo"
          title="Adoptopia"
          class="h-8"
        />
        <div class="text-white text-2xl">Adoptopia</div>
      </router-link>
    </div>

    <!-- menu -->
    <div class="flex items-center space-x-4">
      <div class="nav text-white text-xl">
        <router-link
          to="trade"
          class="border-b-2 border-transparent hover:border-blue-500"
          >Trade</router-link
        >
      </div>
      <div class="nav text-white text-xl">
        <router-link
          to="post"
          class="border-b-2 border-transparent hover:border-blue-500"
          >Post</router-link
        >
      </div>
      <div class="text-white text-xl hover:border-blue-400" v-if="!login">
        <router-link to="/login" class="p-2 border-b-2 border-transparent hover:border-blue-500">
          Login
        </router-link>
      </div>

      <!-- if login -->
      <div v-if="login" class="relative">
        <button class="p-2" @click="isOpen = !isOpen">
          <font-awesome-icon icon="user" class="text-xl text-white" />
        </button>
        <button
          v-if="isOpen"
          @click="isOpen = false"
          class="fixed h-screen w-screen bg-black inset-0 opacity-30"
        ></button>

        <!-- dropdown -->
        <div
          v-if="isOpen"
          class="bg-gray-200 absolute rounded-xl right-0 py-4 px-2"
        >
          <router-link
            to="myadopt"
            class="block px-8 py-2 hover:bg-gray-300 rounded-xl text-center"
            >MyAdop</router-link
          >
          <router-link
            to="addadopt"
            class="block px-8 py-2 hover:bg-gray-300 rounded-xl text-center"
            >AddAdop</router-link
          >
          <router-link
            to="history"
            class="block px-8 py-2 hover:bg-gray-300 rounded-xl text-center"
            >History</router-link
          >
          <div class="border-b-2 border-gray-400 mx-2 my-1"></div>
          <button
            class="block w-full px-8 py-2 hover:bg-gray-300 rounded-xl text-center"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: false,
      isOpen: false,
      showNavbar: true,
      ontopNavbar: true,
      lastScrollPosition: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
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
}
</style>
