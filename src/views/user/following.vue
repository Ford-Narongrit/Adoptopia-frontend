<template>
  <div>
    <follow
      :follows="followings"
      :loading="loading"
      :isFollower="false"
      :errors="errors"
    ></follow>
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
      errors: null,
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
        let res = await UserStore.dispatch(
          "getUser",
          this.$route.params.username
        );
        this.followings = res.data.following;
      } catch (error) {
        this.errors = true;
        console.error(error);
      }
      this.loading = false;
    },
    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },
  },
};
</script>

<style></style>
