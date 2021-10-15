<template>
  <div>
    <!-- if errors "not found 404" -->
    <div
      v-if="errors"
      class="text-white my-text-title text-center flex justify-center items-center h-screen"
    >
      {{ errors.data.message }}
    </div>

    <div v-else class="lg:flex block h-screen">
      <div v-if="loading" class="w-full flex items-center justify-center">
        <div class="w-96 h-96 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
      <slide-image
        v-if="!loading"
        :images="adopt.adopt_image"
        class="w-full h-3/4 lg:h-full"
      />
      <div class="bg-shark-800 lg:w-96 py-10 px-3 space-y-3">
        <div
          v-if="loading"
          class="bg-white h-10 rounded-lg animate-pulse"
        ></div>
        <div class="text-white my-text-title text-center" v-if="!loading">
          {{ adopt.name }}
        </div>
        <div v-if="loading" class="grid grid-cols-4 gap-1 animate-pulse">
          <div class="h-5 col-span-2 rounded-lg bg-white"></div>
          <div class="h-5 col-span-1 rounded-lg bg-white"></div>
          <div class="h-5 col-span-1 rounded-lg bg-white"></div>
          <div class="h-5 col-span-1 rounded-lg bg-white"></div>
          <div class="h-5 col-span-2 rounded-lg bg-white"></div>
        </div>
        <div v-if="!loading">
          <span
            v-for="category in adopt.category"
            :key="category.id"
            class="bg-blue-400 px-1 rounded-lg inline-block m-1 my-text-base"
          >
            <router-link to="##" class="hover:underline">
              {{ category.name }}
            </router-link>
          </span>
        </div>
        <div class="text-white my-text-subtitle">Agreement</div>
        <div v-if="loading" class="bg-gray-600 rounded-lg p-2">
          <div class="grid grid-cols-4 gap-1 animate-pulse">
            <div class="h-6 col-span-2 rounded-lg bg-white"></div>
            <div class="h-6 col-span-1 rounded-lg bg-white"></div>
            <div class="h-6 col-span-1 rounded-lg bg-white"></div>
            <div class="h-6 col-span-1 rounded-lg bg-white"></div>
            <div class="h-6 col-span-2 rounded-lg bg-white"></div>
            <div class="h-6 col-span-4 rounded-lg bg-white"></div>
            <div class="h-6 col-span-2 rounded-lg bg-white"></div>
            <div class="h-6 col-span-2 rounded-lg bg-white"></div>
          </div>
        </div>
        <div
          v-if="!loading"
          class="text-white my-text-content bg-gray-600 rounded-lg p-2 mark-content"
          v-html="compiledMarkdown(adopt.agreement)"
        ></div>
        <div
          v-if="loading"
          class="bg-white h-10 rounded-lg animate-pulse"
        ></div>
        <div
          v-if="loading"
          class="bg-white h-10 rounded-lg animate-pulse"
        ></div>
        <div v-if="!loading" class="text-white my-text-base">
          Created at: {{ getFormatTime(adopt.created_at) }}
        </div>
        <div v-if="!loading" class="text-white my-text-base">
          Receive at: {{ getFormatTime(adopt.updated_at) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdoptStore from "@/store/Adopt";
import slideImage from "@/components/SlideImage.vue";
import moment from "moment";
import marked from "marked";
export default {
  components: { slideImage },
  data() {
    return {
      adopt: {},
      errors: null,
      loading: true,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        let res = await AdoptStore.dispatch(
          "getAdopt_id",
          this.$route.params.id
        );
        this.adopt = AdoptStore.getters.adopt;
        this.loading = false;
      } catch (error) {
        this.errors = error.response;
        console.error(error.response);
      }
    },
    getFormatTime(time) {
      return moment(time).format("l");
    },
    compiledMarkdown(text) {
      return marked(text);
    },
  },
};
</script>

<style></style>
