<template>
  <div class="min-h-screen relative pb-48">
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
                :title="user.name"
                class=" object-cover w-36 h-36 rounded-full shadow-lg mx-auto border-4 border-gray-900"
              />
              <div class="my-text-super text-white text-center">
                {{ user.name }}
              </div>
              <div class="my-text-content text-white text-center">
                @{{ user.username }}
              </div>
              <div class="my-text-content text-white text-center">
                <router-link to="followers" class="hover:underline"
                  >{{
                    makeFollower(user.followers.length)
                  }}
                  followers</router-link
                >
                |
                <router-link to="following" class="hover:underline"
                  >{{
                    makeFollower(user.following.length)
                  }}
                  following</router-link
                >
              </div>
            </div>

            <!-- edit profile -->
            <div class="absolute bottom-0 right-0" v-if="user.isOwner">
              <router-link
                to="edit"
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

            <div class="absolute bottom-0 right-0 flex items-center">
              <report :user="user" :report_list="report_list" type="User" />

              <!-- follow -->
              <button
                v-if="!user.isOwner && !isFollow"
                @click="followed()"
                class="border-4 border-gray-500 bg-white block px-8 py-2 rounded-3xl m-1 hover:bg-gray-200 w-36 transition"
              >
                <span class="my-text-base text-black">
                  Follow
                </span>
              </button>

              <!-- following -->
              <button
                v-if="!user.isOwner && isFollow"
                @click="unfollow()"
                class="border-4 border-gray-500 bg-gray-400 block px-8 py-2 rounded-3xl m-1 hover:bg-red-700 hover:border-red-400 w-36 transition"
                @mouseover="unFollow = true"
                @mouseleave="unFollow = false"
              >
                <span class="my-text-base text-white">
                  {{ unFollow ? "Unfollow" : "Following" }}
                </span>
              </button>
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
            to="home"
            class="my-text-base text-white hover:bg-gray-700"
            >HOME</router-link
          >
          <router-link
            to="adop"
            class="my-text-base text-white hover:bg-gray-700"
            >ADOP</router-link
          >
        </div>
      </div>
    </div>
    <div v-if="errors" class="mt-20">
      <div class="text-white my-text-title text-center">
        This account doesn’t exist
      </div>
      <div class="text-white my-text-base text-center">
        Try searching for another.
      </div>
    </div>
    <div v-if="!errors && !loading" class="container mx-auto pt-10">
      <slot />
    </div>
    <!-- <div class="absolute w-full bg-gray-700 h-32 mt-10 bottom-0">
      footer
    </div> -->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import UserStore from "@/store/User";
import ReportStore from "@/store/Report";
import Report from "@/components/Report.vue";
export default {
  name: "ProfileLayout",
  data() {
    return {
      user: {},
      loading: true,
      isFollow: false,
      unFollow: false,
      menu: false,
      otherReport: "",
      report_list: [
        "It's suspicious or spam",
        "It appears their account is hacked",
        "They're pretending to be me or someone else",
        "Their Account are abusive or hateful",
      ],
      errors: null,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        let res = await UserStore.dispatch(
          "getUser",
          this.$route.params.username
        );
        this.user = res.data;
        if (UserStore.getters.isAuthen) {
          let me = await UserStore.dispatch("isFollow", this.user.id);
          this.isFollow = me.data.isFollow;
        }
        this.loading = false;
      } catch (error) {
        this.errors = error.response.status;
      }
    },
    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },
    intlFormat(num) {
      return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
    },
    makeFollower(num) {
      if (num >= 1000000) return this.intlFormat(num / 1000000) + "M";
      if (num >= 1000) return this.intlFormat(num / 1000) + "k";
      return this.intlFormat(num);
    },
    async followed() {
      let res = await UserStore.dispatch("follow", this.user.id);
      this.isFollow = true;
    },
    async unfollow() {
      let res = await UserStore.dispatch("unFollow", this.user.id);
      this.isFollow = false;
    },
    async sendReport(message) {
      let payload = {
        description: message,
        user_id: this.user.id,
      };
      let res = await ReportStore.dispatch("sentReportUser", payload);
      this.clearMenu();
    },
    cancelReport() {
      this.clearMenu();
    },
    clearMenu() {
      this.otherReport = "";
      this.menu = false;
    },
  },
  components: {
    Report,
    Navbar,
  },
};
</script>
