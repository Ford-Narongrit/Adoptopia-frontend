<template>
  <div>
    <div class="flex flex-nowrap py-8" v-if="!loading">
      <div class="flex-nowrap py-8">
        <label for="type" class="px-5 mt-2 text-white">Type: </label>
        <select
          v-model="type"
          class="my-text-content rounded-lg px-2 py-1 my-block-focus"
        >
          <option disabled value="">Please select a type</option>
          <option value="OTA">OTA(Offer to Adop)</option>
          <option value="DTA">DTA(Offer to Draw)</option>
          <option value="For Sale">For Sale</option>
        </select>
      </div>
      <div class="flex flex-nowrap py-8">
        <label class="px-4 mt-2 text-white">Category</label>
        <multiselect
          v-model="catagory"
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
          search
        </button>
      </div>
    </div>
    <Loading v-if="loading" />
    <div class="px-7" v-if="!loading">
      <vue-flex-waterfall :col="4" :col-spacing="20" :break-by-container="true">
        <div v-for="adopt_list in filtered_adop" :key="adopt_list.index">
          <router-link
            :to="{
              path: '/' + adopt_list.type + '/' + adopt_list.id,
              name: adopt_list.type,
              params: { id: adopt_list.id },
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
import Loading from "../components/Loading.vue";
import TradeStore from "../store/Trade.js";
import SelectAdop from "@/components/SelectAdop.vue";

export default {
  components: {
    Multiselect,
    VueFlexWaterfall,
    SelectAdop,
    Loading,
  },
  data() {
    return {
      catagory: null,
      categories: [],
      type: "",
      adopts: [],
      filtered_adop: [],
      selectedImage: null,
      loading: true,
    };
  },
  computed: {
    search_filter: function () {
      if (this.type === "OTA") {
        this.filtered_adop.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        return this.filtered_adop;
      }
    },
  },
  methods: {
    async fetchTrade() {
      try {
        await TradeStore.dispatch("getPost_Adops_list");
        this.adopts = TradeStore.getters.post_adops_list;
        this.filterAdop();
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
      this.loading = false;
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
  maxSelected() {
    const selectedItems = this.form.catagory.length;
    this.maxItemsSelected = false;
    if (selectedItems >= 3) {
      this.maxItemsSelected = true;
    }
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