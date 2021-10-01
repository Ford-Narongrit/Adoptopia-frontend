<template>
  <div>
    {{ adopt }}
  </div>
</template>

<script>
import UserStore from "@/store/User";
export default {
  data() {
    return {
      adopt: [],
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        let res = await UserStore.dispatch("getMe");
        console.log(res);
        this.adopt = res.data.user;
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
