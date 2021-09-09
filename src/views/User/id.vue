<template>
  <div>user: {{ user }}</div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        const id = this.$route.params.id;
        let res = await axios.get("/userkkk/" + id);
        this.user = res.data;
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style></style>
