<template>
  <div>
    <div class="flex justify-center text-7xl my-8 text-white">Banned User</div>
    <div class="bg-white m-3 rounded-md p-3 space-y-3">
      <table class="w-full">
        <thead class="w-full">
          <tr
            class="my-text-content text-gray-900 bg-gray-300 uppercase border-b border"
          >
            <th class="px-4 py-3">No.</th>
            <th class="px-4 py-3">user id</th>
            <th class="px-4 py-3">username</th>
            <th class="px-4 py-3">email</th>
            <th class="px-4 py-3">name</th>
            <th class="px-4 py-3">Banned at</th>
            <th class="px-4 py-3 w-36"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in users"
            :key="index"
            class="my-text-base text-gray-900 bg-gray-100 hover:bg-gray-200"
          >
            <th class="px-4 py-3">{{ index + 1 }}</th>
            <th class="px-4 py-3">{{ user.id }}</th>
            <th class="px-4 py-3">
              <router-link
                :to="`/${user.username}/home`"
                class="block hover:underline"
              >
                {{ user.username }}
              </router-link>
            </th>
            <th class="px-4 py-3">{{ user.email }}</th>
            <th class="px-4 py-3">{{ user.name }}</th>
            <th class="px-4 py-3">{{ getFormatTime(user.updated_at) }}</th>
            <th class="py-2 mx-auto">
              <button
                v-if="!user.banned"
                class="px-4 py-1 rounded-lg bg-red-400 hover:bg-red-500"
                @click="banUser(user)"
              >
                BAN
              </button>
              <button
                v-if="user.banned"
                class="px-4 py-1 rounded-lg bg-gray-400 hover:bg-gray-500"
                @click="unBanUser(user)"
              >
                BANNED
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserStore from "@/store/User";
import ReportStore from "@/store/Report";
import moment from "moment";
export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        let res = await UserStore.dispatch("getAllBanUsers");
        this.users = res.data;
      } catch (error) {
        console.error(error.response);
      }
    },
    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },
    getFormatTime(time) {
      return moment(time).format("l");
    },
    async banUser(user) {
      user.banned = true;
      let res = await ReportStore.dispatch("ban", user.id);
      
    },
    async unBanUser(user) {
      user.banned = false;
      let res = await ReportStore.dispatch("unBan", user.id);
    },
  },
};
</script>

<style></style>
