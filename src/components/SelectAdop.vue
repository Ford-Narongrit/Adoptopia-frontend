<template>
    <div class="relative overflow-hidden my-font-eng text-black" @mouseover="isShow = true" @mouseleave="isShow = false">
      <img
        class="rounded-md transition duration-300 ease-in-out transform hover:scale-110"
        :src="getImagePath(adopt.adopt_image[0].path)"
        :height="`${adopt.adopt_image[0].height}px`"
        :width="`${adopt.adopt_image[0].height}px`"
      />
      <div v-if="isShow" class="absolute bottom-0 bg-gray-100 w-full px-4 py-2 rounded-b-md hidden md:block shadow-lg animate-fade-in-up">
      <div class="my-text-subtitle">
        {{ adopt.name }}
      </div>

      <div>
        <span v-for="category in adopt.category" :key="category.id" class="bg-blue-400 px-1 rounded-lg inline-block m-1">
          {{ category.name }}
        </span>
      </div>

      <div>
        {{ getFormatTime(adopt.updated_at) }}
      </div>
    </div>
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
  data() {
    return {
      isShow: false,
    };
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

<style>

</style>