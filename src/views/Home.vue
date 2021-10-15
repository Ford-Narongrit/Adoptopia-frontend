<template>
  <div>
    <div class="flex flex-nowrap py-8">
      <div class="flex-nowrap py-8">
        <label for="type" class="px-5 mt-2 text-white">Type: </label>
        <select
          v-model="type"
          class="my-text-content rounded-lg px-2 py-1 my-block-focus"
        >
          <option disabled value="">Please select a type</option>
          <!-- Auction, OTA, DTA, SP -->
          <option
            v-for="(type, index) in types"
            :key="index"
            class="hover:bg-black"
          >
            {{ type }}
          </option>
        </select>
      </div>
      <div class="flex flex-nowrap py-8">
        <label class="px-4 mt-2 text-white">Category</label>
        <multiselect
          v-model="valueCat"
          :options="categories"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Search or select category"
          label="name"
          track-by="name"
          :max="3"
          @input="maxSelected()"
        >
        </multiselect>
      </div>
      <div class="py-8 px-4">
        <button
          class="
            bg-blue-600
            rounded-full
            w-28
            p-2
            text-white
            my-text-content
            hover:bg-blue-400
            my-block-focus
          "
        >
          seach
        </button>
      </div>
    </div>
    <div class="px-7">
      <vue-flex-waterfall :col="4" :col-spacing="20" :break-by-container="true">
        <div v-for="adopt_list in filterAdop()" :key="adopt_list.index">
          <router-link
            :to="{
              path: '/' + adopt_list.type + '/' + adopt_list.id,
              name: adopt_list.type,
              params: { postInfo: adopt_list, id: adopt_list.id },
            }"
          >
            <img
              :src="getImagePath(adopt_list.adopt.adopt_image[0].path)"
              height="200px"
              width="350px"
              class="
                transition
                duration-300
                ease-in-out
                transform
                hover:scale-110
              "
            />
          </router-link>
          <br />
        </div>
      </vue-flex-waterfall>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import VueFlexWaterfall from "vue-flex-waterfall";
import TradeStore from "../store/Trade.js";
import SelectAdop from "@/components/SelectAdop.vue";

export default {
  components: {
    Multiselect,
    VueFlexWaterfall,
    SelectAdop,
  },
  data() {
    return {
      valueCat: null,
      categories: [],
      type: "",
      types: ["OTA", "DTA", "For Sale"],
      adopts: [],
      filtered_adop: [],
      selectedImage: null,
    };
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.value.push(tag);
    },
    async fetchTrade() {
      try {
        await TradeStore.dispatch("getPost_Adops_list");
        this.adopts = TradeStore.getters.post_adops_list;
      } catch (error) {
        console.error(error.response);
      }
    },
    async fetchCategory() {
      let res = await axios.get("/category");
      this.categories = res.data;
    },
    filterAdop() {
      for (var i = 0, j = 0; i < this.adopts.length; i++) {
        if (this.adopts[i].status !== "off") {
          this.filtered_adop[j] = this.adopts[i];
          j++;
        }
      }
      return this.filtered_adop;
    },
    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },
  },
  created() {
    this.fetchTrade();
    this.fetchCategory();
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.multiselect__tag {
  background-color: #1e63e9;
}
.multiselect__tag-icon:after {
  color: white;
}
.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: #272727;
}
.multiselect {
  display: block;
  position: relative;
  width: 100%;
  min-height: 40px;
  text-align: left;
  color: #272727;
}
.multiselect__input::placeholder {
  color: #272727;
}
/* .multiselect__option--highlight {
  background: #272727;
  outline: none;
  color: white;
} */
.multiselect__option--selected {
  background: white;
  color: #272727;
}
</style>