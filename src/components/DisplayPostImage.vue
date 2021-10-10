<template>
  <div
    class="relative overflow-hidden"
  >
   <!-- <router-link
      :to="{ path: '/profile/adopt/' + adopt.id }"
      class="cursor-default"
    > -->
      <img
        class="transition duration-300 ease-in-out transform hover:scale-110"
        :src="getImagePath(adopt.adopt_image[0].path)"
        height="200px"
        width="350px"
      />
    <!-- </router-link> -->
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    adopt: {
      type: Object,
      default: {},
    },
  },
  methods: {
    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },
    getFormatTime(time) {
      return moment(time).fromNow();
    },
  },
};
</script>

<style></style>
