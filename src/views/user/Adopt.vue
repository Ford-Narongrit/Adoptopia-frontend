<template>
  <div class="grid grid-cols-4">
    <vue-flex-waterfall :col="4" :col-spacing="15" :break-by-container="true">
      <div
        v-for="adopt in adopts"
        :key="adopt.id"
        class="my-2 relative border-4 border-shark-400 rounded-lg bg-black"
      >
        <pop-up-adopt :adopt="adopt" />
      </div>
    </vue-flex-waterfall>
  </div>
</template>

<script>
import AdoptStore from "@/store/Adopt";
import VueFlexWaterfall from "vue-flex-waterfall";
import PopUpAdopt from "@/components/PopUpAdopt.vue";

export default {
  data() {
    return {
      adopts: [],
    };
  },
  components: {
    PopUpAdopt,
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
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
