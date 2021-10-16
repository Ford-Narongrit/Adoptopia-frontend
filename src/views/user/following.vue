<template>
  <div>
    <follow :follows="followings" :loading="loading" :isFollower="false"></follow>
  </div>
</template>

<script>
import UserStore from "@/store/User";
import Follow from "@/components/Follow.vue";
export default {
  data() {
    return {
      followings: [],
      loading: true,
    };
  },
  components: {
    Follow,
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        let res = await UserStore.dispatch("getUser", this.$route.params.username);
        this.followings = res.data.following;
        this.loading = false;
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
