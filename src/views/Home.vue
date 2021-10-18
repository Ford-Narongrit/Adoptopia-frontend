<template>
  <div>
    <!-- search -->
    <div class="flex items-center py-8">
      <!-- select type -->
      <div class="flex items-center w-3/12">
        <label for="type" class="px-5 text-white">Type: </label>
        <multiselect
          v-model="type"
          :options="type_list"
          track-by="value"
          label="text"
          :searchable="false"
          :close-on-select="false"
          :show-labels="false"
          placeholder="Select post type"
        ></multiselect>
      </div>

      <!-- search category -->
      <div class="flex items-center w-2/5 space-x-2">
        <label class="px-4 text-white">Category</label>
        <multiselect
          v-model="selectedCategories"
          id="ajax"
          label="name"
          track-by="name"
          placeholder="Search or select category"
          open-direction="bottom"
          :options="categories"
          :multiple="true"
          :searchable="true"
          :loading="isLoading"
          :internal-search="false"
          :clear-on-select="false"
          :close-on-select="false"
          :options-limit="300"
          :limit="3"
          :limit-text="limitText"
          :max-height="600"
          :show-no-results="false"
          :hide-selected="true"
          @search-change="asyncFind"
        >
        </multiselect>
        <button
          @click="clearAll()"
          v-if="selectedCategories.length > 0 || type.value !== ''"
        >
          <font-awesome-icon
            icon="times-circle"
            class="text-3xl text-red-500"
          />
        </button>
      </div>
    </div>

    <!-- post -->
    <div class="grid grid-cols-4 gap-3">
      <vue-flex-waterfall :col="4" :col-spacing="15" :break-by-container="true">
        <div
          v-for="post in filter_post"
          :key="post.id"
          class="my-2 relative border-4 border-shark-400 rounded-lg bg-black"
        >
          <pop-up-post :post="post" />
        </div>
      </vue-flex-waterfall>
    </div>
  </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import VueFlexWaterfall from "vue-flex-waterfall";
import PopUpPost from "@/components/PopUpPost.vue";
import TradeStore from "@/store/Trade";
import Axios from "axios";

export default {
  components: {
    Multiselect,
    VueFlexWaterfall,
    PopUpPost,
  },
  data() {
    return {
      categories: [],
      selectedCategories: [],
      type_list: [
        { value: "ota", text: "OTA (Offer to Adop)" },
        { value: "dta", text: "DTA (Draw to Adop)" },
        { value: "sale", text: "For sale" },
      ],
      type: { value: "", text: "Select post type" },
      isLoading: false,
      posts: [],
    };
  },
  mounted() {
    this.fetchCat();
    this.fetchPost();
  },
  computed: {
    filter_post: function() {
      let filter_by_type = this.posts.filter((post) => {
        return post.type.includes(this.type.value);
      });
      return filter_by_type.filter((post) => {
        return this.selectedCategories
          .map((item) => item.name)
          .every(
            (element) =>
              post.adopt.category.map((item) => item.name).indexOf(element) > -1
          );
      });
    },
  },
  methods: {
    async fetchCat() {
      let res = await Axios.get(`/category`);
      this.categories = res.data;
    },
    async fetchPost() {
      let res = await TradeStore.dispatch("getPost_Adops_list");
      this.posts = res.data;
    },
    limitText(count) {
      return `and ${count} other countries`;
    },
    asyncFind(query) {
      this.isLoading = true;
      Axios.post(`/category/search`, { slug: query }).then((response) => {
        this.categories = response.data;
        this.isLoading = false;
      });
    },
    clearAll() {
      this.type = { value: "", text: "Select post type" };
      this.selectedCategories = [];
    },
  },
};
</script>

<style></style>
