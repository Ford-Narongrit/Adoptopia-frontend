<template>
  <div>
    <follow :follows="followers" :loading="loading"></follow>
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
        let res = await UserStore.dispatch("getMe");
        this.followers = res.data.followers;
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
