<template>
  <div
    class="relative overflow-hidden"
    @mouseover="isShow = true"
    @mouseleave="isShow = false"
  >
    <router-link
      :to="{
        path: '/' + post.type + '/' + post.id,
        name: post.type,
        params: { id: post.id },
      }"
      class="cursor-default"
    >
      <img
        :src="getImagePath(post.adopt.adopt_image[0].path)"
        :height="`${post.adopt.adopt_image[0].height}px`"
        :width="`${post.adopt.adopt_image[0].height}px`"
        class="rounded-md transition duration-300 ease-in-out transform"
        :class="isShow ? 'filter brightness-90 blur-sm' : ''"
      />
    </router-link>
    <div
      class="absolute top-0 right-0 px-2 py-1 rounded-lg uppercase font-semibold shadow-xl cursor-default"
      :class="colorType(post.type)"
    >
      {{ post.type }}
    </div>
    <div
      v-if="isShow"
      class="absolute bottom-0 w-full px-4 py-2 rounded-b-md hidden md:block shadow-lg animate-fade-in-up"
    >
      <div class="my-text-content truncate text-gray-100 font-bold">
        {{ post.adopt.name }}
      </div>
      <div class="flex space-x-3 items-center">
        <img
          :src="getImagePath(post.user.profile)"
          :alt="post.user.username"
          :title="`@${post.user.username}`"
          class="object-cover w-8 h-8 rounded-full shadow-xl"
        />
        <div>
          <router-link
            :to="`/${post.user.username}/home`"
            class="my-text-base text-gray-100 font-bold block hover:underline truncate"
          >
            {{ post.user.name }}
          </router-link>
          <div class="my-text-base text-gray-100 truncate ">
            @{{ post.user.username }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    post: {
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
    colorType(colorType) {
      switch (colorType) {
        case "sale":
          return "bg-red-400";
        case "dta":
          return "bg-green-400";
        case "ota":
          return "bg-yellow-400";
        default:
          return "bg-white";
      }
    },
  },
};
</script>

<style></style>
