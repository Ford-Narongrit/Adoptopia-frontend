<template>
  <div class="grid grid-cols-4">
    <vue-flex-waterfall
      :col="4"
      :col-spacing="15"
      :break-at="breakAt"
      :break-by-container="true"
      @order-update="onOrderUpdate"
    >
      <div v-for="adopt in adopts" :key="adopt.id" class="py-2">
        <img
          class="rounded-lg"
          :src="getImagePath(adopt.adopt_image[0].path)"
          :height="`${adopt.adopt_image[0].height}px`"
          :width="`${adopt.adopt_image[0].height}px`"
        />
      </div>
    </vue-flex-waterfall>
  </div>
</template>

<script>
import AdoptStore from "@/store/Adopt";
import VueFlexWaterfall from "vue-flex-waterfall";
export default {
  data() {
    return {
      adopts: [],
    };
  },
  components: {
    VueFlexWaterfall,
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        let res = await AdoptStore.dispatch("getAdopts");
        this.adopts = AdoptStore.getters.adopts;
        console.log(this.adopts);
      } catch (error) {
        console.error(error);
      }
    },
    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },
  },
};
</script>

<style></style>
