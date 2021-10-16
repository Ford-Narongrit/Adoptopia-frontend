<template>
  <div
    class="relative overflow-hidden"
    @mouseover="isShow = true"
    @mouseleave="isShow = false"
  >
    <router-link
      :to="{ path: '/profile/adop/' + adopt.id }"
      class="cursor-default"
    >
      <img
        v-if="!adopt.adopt_image[0]"
        src="/favicon.ico"
        class="rounded-md transition duration-300 ease-in-out transform hover:scale-110"
        alt=""
      />
      <img
        v-if="adopt.adopt_image[0]"
        class="rounded-md transition duration-300 ease-in-out transform hover:scale-110"
        :src="getImagePath(adopt.adopt_image[0].path)"
        :height="`${adopt.adopt_image[0].height}px`"
        :width="`${adopt.adopt_image[0].height}px`"
      />
      <div
        v-if="isShow"
        class="absolute bottom-0 bg-gray-100 w-full px-4 py-2 rounded-b-md hidden md:block shadow-lg animate-fade-in-up"
      >
        <div class="my-text-subtitle">
          <router-link
            :to="{ path: '/profile/adop/' + adopt.id }"
            class="hover:underline "
          >
            {{ adopt.name }}
          </router-link>
        </div>
        <div>
          <span
            v-for="category in adopt.category"
            :key="category.id"
            class="bg-blue-400 px-1 rounded-lg inline-block m-1"
          >
            <router-link to="##" class="hover:underline">
              {{ category.name }}
            </router-link>
          </span>
        </div>
        <div>
          {{ getFormatTime(adopt.updated_at) }}
        </div>
      </div>
    </router-link>
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

<style></style>
