<template>
  <div>
    <navbar />
    <div class="container mx-auto pt-10 min-h-screen">
      <div class="space-y-4" v-if="!loading">
        <router-link to="/profile/home" class="my-text-super text-white text-center block hover:underline">
          {{ user.name }}
        </router-link>
        <div class="my-text-content text-white text-center">
          @{{ user.username }}
        </div>
      </div>
      <div class="space-y-4" v-if="loading">
        <div
          class=" bg-gray-100 h-12 rounded-lg w-96 animate-pulse mx-auto"
        ></div>
        <div
          class=" bg-gray-100 h-6 rounded-lg w-72 mx-auto animate-pulse"
        ></div>
      </div>
      <div class="flex justify-center mt-16 nav space-x-4">
        <router-link
          to="followers"
          class="my-text-subtitle text-white hover:bg-gray-700"
          >followers</router-link
        >
        <router-link
          to="following"
          class="my-text-subtitle text-white hover:bg-gray-700"
          >following</router-link
        >
      </div>
      <div class="mx-44 m-5">
        <slot />
      </div>
    </div>
    <div class="bg-gray-700 h-32 mt-10">
      footer
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import UserStore from "@/store/User";
export default {
  name: "MainLayout",
  components: {
    Navbar,
  },
  data() {
    return {
      user: {},
      loading: true,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        let res = await UserStore.dispatch("getMe");
        this.user = res.data;
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
