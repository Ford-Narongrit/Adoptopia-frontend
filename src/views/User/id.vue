<template>
  <div class="space-y-4">
    <div class="flex space-x-5">
      <img
        :src="getImagePath(user.profile)"
        alt="profile"
        title="user.name"
        class="inline object-cover w-36 h-36 rounded-full"
      />
      <div class="space-y-3">
        <div class="my-text-super text-white">{{ user.name }}</div>
        <div class="my-text-content text-white">{{ user.username }}</div>
        <div class="my-text-content text-white">{{ user.description }}</div>
      </div>
    </div>
    <div class="flex justify-center space-x-5">
      <button
        class="bg-shark-600 rounded-lg py-3 px-10 text-white my-text-content hover:bg-shark-400 my-block-focus"
      >
        ADOT
      </button>
      <button
        class="bg-blue-600 rounded-lg py-3 px-10 text-white my-text-content hover:bg-blue-400 my-block-focus"
      >
        POST
      </button>
    </div>
    <div>
      TODO
    </div>
  </div>
</template>

<script>
import UserStore from "../../store/User";
export default {
  data() {
    return {
      user: {},
      bgImage:
        "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
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
      } catch (error) {
        console.error(error);
      }
    },
    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },
  },
};
</script>

<style></style>
