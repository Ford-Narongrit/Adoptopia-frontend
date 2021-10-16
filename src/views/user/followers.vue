<template>
  <div>
    <follow
      :follows="followers"
      :loading="loading"
      :isFollower="true"
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
      followers: [],
      loading: true,
      errors: false,
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
        this.followers = res.data.followers;
      } catch (error) {
        this.errors = true;
        console.error(error);
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
