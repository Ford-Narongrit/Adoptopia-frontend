<template>
  <div>
    <!-- search -->
    <div class="flex justify-between items-center py-8 space-x-2">
      <div class="flex items-center w-full">
        <!-- select type -->
        <div class="flex items-center w-3/12">
          <label for="type" class="px-5 text-white my-text-content"
            >Type:
          </label>
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
          <label class="px-4 text-white my-text-content">Category</label>
          <multiselect
            v-model="selectedCategories"
            id="cat"
            label="name"
            track-by="name"
            :show-labels="false"
            placeholder="Search or select category"
            open-direction="bottom"
            :options="categories"
            :multiple="true"
            :searchable="true"
            :loading="isLoading.cat"
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
            @click="clearAllPost()"
            v-if="selectedCategories.length > 0 || type.value !== ''"
          >
            <font-awesome-icon
              icon="times-circle"
              class="text-3xl text-red-500"
            />
          </button>
        </div>
      </div>

      <!-- search Account -->
      <div class="flex items-center w-4/12 space-x-1">
        <label class="px-4 text-white my-text-content">search</label>
        <multiselect
          v-model="selectedUser"
          id="user"
          label="name"
          track-by="name"
          placeholder="Search Account"
          open-direction="bottom"
          :options="user_list"
          :loading="isLoading.user"
          :internal-search="false"
          :clear-on-select="true"
          :options-limit="300"
          :limit="3"
          :max-height="600"
          :show-no-results="false"
          :show-labels="false"
          @search-change="asyncUser"
          @select="goToProfile()"
        >
          <template slot="option" slot-scope="props">
            <router-link :to="`${props.option.username}/home`">
              <div class="flex space-x-2">
                <img
                  :src="getImagePath(props.option.profile)"
                  :title="props.option.name"
                  class=" object-cover w-10 h-10 rounded-full shadow-lg bg-white"
                />
                <div class="space-y-1">
                  <div>{{ props.option.name }}</div>
                  <div>@{{ props.option.username }}</div>
                </div>
              </div>
            </router-link>
          </template>
          >
        </multiselect>
        <button @click="clearAllUser()" v-if="selectedUser">
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
      isLoading: {
        cat: false,
        user: false,
      },
      posts: [],
      user_list: [],
      selectedUser: null,
    };
  },
  mounted() {
    this.fetchCat();
    this.fetchPost();
    this.fetchUser();
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
    async fetchUser() {
      let res = await Axios.post(`/search/user`, { username: "" });
      this.user_list = res.data;
    },
    limitText(count) {
      return `and ${count} other categories`;
    },
    asyncFind(query) {
      this.isLoading.cat = true;
      Axios.post(`/category/search`, { slug: query }).then((response) => {
        this.categories = response.data;
        this.isLoading.cat = false;
      });
    },
    asyncUser(query) {
      this.isLoading.user = true;
      Axios.post(`/search/user`, { username: query }).then((response) => {
        this.user_list = response.data;
      });
    },
    clearAllUser() {
      this.selectedUser = null;
    },
    clearAllPost() {
      this.type = { value: "", text: "Select post type" };
      this.selectedCategories = [];
    },
    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },
    async goToProfile() {
      await this.selectedUser;
      this.$router.push(`/${this.selectedUser.username}/home`);
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style >
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
.multiselect__option--highlight {
  background: #272727;
  outline: none;
  color: white;
}
.multiselect__option--selected {
  background: white;
  color: #272727;
}
</style>
