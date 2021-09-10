<template>
  <div class="space-y-4">
    <div class="flex space-x-5">
      <img :src="user.profile" alt="profile" title="user.name" class="rounded-full bg-cover"/>
      <div class="space-y-3">
        <div class="my-text-super text-white">{{ user.name }}</div>
        <div class="my-text-content text-white">{{ user.username }}</div>
        <div class="my-text-content text-white">this is description</div>
      </div>
    </div>
    <div class="flex justify-center space-x-5">
      <button class="bg-shark-600 rounded-lg py-3 px-10 text-white my-text-content hover:bg-shark-400 my-block-focus">ADOT</button>
      <button class="bg-blue-600 rounded-lg py-3 px-10 text-white my-text-content hover:bg-blue-400 my-block-focus">POST</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
        const id = this.$route.params.id;
        let res = await axios.get("/user/" + id);
        this.user = res.data;
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style></style>
