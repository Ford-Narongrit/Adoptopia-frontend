<template>
  <div>
    <navbar />
    <div class="bg-gradient-to-t from-shark-700 space-y-5 py-3">
      <!-- loading -->
      <div class="space-y-3 container mx-auto" v-if="loading">
        <div class="relative h-96 bg-white rounded-xl">
          <div
            class="absolute w-full h-96 inline object-cover object-center rounded-xl bg-gray-400 animate-pulse"
          ></div>
          <div class="bottom-0 w-full absolute flex justify-center">
            <div class="space-y-2 pb-3">
              <div
                class="object-cover w-36 h-36 rounded-full shadow-lg mx-auto border-4 border-gray-500 bg-gray-100 animate-pulse"
              ></div>
              <div
                class=" bg-gray-100 h-12 rounded-lg w-96 animate-pulse"
              ></div>
              <div
                class=" bg-gray-100 h-6 rounded-lg w-72 mx-auto animate-pulse"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- profile -->
      <div class="space-y-3 container mx-auto" v-if="!loading">
        <div class="relative h-96 bg-black rounded-xl">
          <img
            :src="getImagePath(user.cover)"
            alt="backimage"
            class="absolute w-full h-96 inline object-cover object-center rounded-xl opacity-80"
            style="z-index: 0"
          />
          <div class="bottom-0 w-full absolute flex justify-center">
            <div class="space-y-2 pb-3">
              <img
                :src="getImagePath(user.profile)"
                alt="profile"
                title="user.name"
                class=" object-cover w-36 h-36 rounded-full shadow-lg mx-auto border-4 border-gray-900"
              />
              <div class="my-text-super text-white text-center">
                {{ user.name }}
              </div>
              <div class="my-text-content text-white text-center">
                @{{ user.username }}
              </div>
            </div>
            <div class="absolute bottom-0 right-0">
              <router-link
                to="/profile/edit"
                class="bg-shark-400 block px-5 py-2 rounded-lg m-1 hover:bg-gray-700"
              >
                <font-awesome-icon
                  icon="user-edit"
                  class="my-text-base text-white"
                />
                <span class="my-text-base text-white ">
                  Edit Profile
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- description -->
      <div class="mx-2 md:mx-32 text-center space-y-16">
        <div class="my-text-content text-white">
          {{ user.description }}
        </div>
        <!-- link -->
        <div class="flex justify-center nav space-x-4">
          <router-link
            to="/profile/home"
            class="my-text-base text-white hover:bg-gray-700"
            >HOME</router-link
          >
          <router-link
            to="/profile/posts"
            class="my-text-base text-white hover:bg-gray-700"
            >POST</router-link
          >
          <router-link
            to="/profile/adopt"
            class="my-text-base text-white hover:bg-gray-700"
            >ADOPT</router-link
          >
        </div>
      </div>
    </div>
    <div class="container mx-auto pt-10">
      <slot />
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
  name: "ProfileLayout",
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
    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },
  },
  components: {
    Navbar,
  },
};
</script>
