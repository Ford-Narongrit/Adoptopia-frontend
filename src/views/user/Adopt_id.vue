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
      <slide-image :images="adopt.adopt_image" class="w-full h-3/4 lg:h-full" />
      <div class="bg-shark-800 lg:w-96 py-10 px-3 space-y-3">
        <div class="text-white my-text-title text-center">
          {{ adopt.name }}
        </div>
        <div>
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
        <div class="text-white my-text-content bg-gray-600 rounded-lg p-2">
          {{ adopt.agreement }}
        </div>
        <div class="text-white my-text-base">
          Created at: {{ getFormatTime(adopt.created_at) }}
        </div>
        <div class="text-white my-text-base">
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
export default {
  components: { slideImage },
  data() {
    return {
      adopt: {},
      errors: null,
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
      } catch (error) {
        this.errors = error.response;
        console.error(error.response);
      }
    },
    getFormatTime(time) {
      return moment(time).format("l");
    },
  },
};
</script>

<style></style>
