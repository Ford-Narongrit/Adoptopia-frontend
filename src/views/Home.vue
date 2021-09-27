<template>
  <div>
    <div class="flex flex-nowrap py-8">
      <div class="flex flex-nowrap py-8">
        <label class="px-4 mt-2 text-white">Type</label>
        <multiselect
          v-model="valueTrade"
          :options="optionsTrade"
          placeholder="Select one"
          label="name"
          track-by="name"
          class="typeSelect"
        >
        </multiselect>
      </div>
      <div class="flex flex-nowrap py-8">
        <label class="px-4 mt-2 text-white">Category</label>
        <multiselect
          v-model="valueCat"
          tag-placeholder="Add this as new tag"
          placeholder="Search or add a tag"
          label="name"
          track-by="code"
          :options="optionsCat"
          :multiple="true"
          :taggable="true"
          @tag="addTag"
          class="rounded-full"
        >
        </multiselect>
      </div>
      <div class="flex flex-nowrap py-8 px-4">
        <button class="bg-blue-500 text-white py-2 px-6 rounded">seach</button>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4 px-4 pb-8 h-screen">
      <router-link to="/ota" class="bg-blue-500 text-white py-2 px-6 rounded text-center">
        <button>OTA</button>
      </router-link>
      <router-link to="/dta" class="bg-purple-500 text-white py-2 px-6 rounded text-center">
        <button>DTA</button>
      </router-link>
      <router-link to="/sale" class="bg-pink-500 text-white py-2 px-6 rounded text-center">
        <button>Sale</button>
      </router-link>
      <router-link to="/auction" class="bg-gray-500 text-white py-2 px-6 rounded text-center">
        <button>Auction</button>
      </router-link>
      <router-link to="/ota" class="bg-green-500 text-white py-2 px-6 rounded text-center">
        <button>OTA</button>
      </router-link>
      <router-link to="/dta" class="bg-blue-500 text-white py-2 px-6 rounded text-center">
        <button>DTA</button>
      </router-link>
      <router-link to="/sale" class="bg-purple-500 text-white py-2 px-6 rounded text-center">
        <button>Sale</button>
      </router-link>
      <router-link to="/auction" class="bg-red-500 text-white py-2 px-6 rounded text-center">
        <button>Auction</button>
      </router-link>
    </div>
  </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import VueFlexWaterfall from "vue-flex-waterfall";
export default {
  components: {
    Multiselect,
    VueFlexWaterfall,
  },
  data() {
    return {
      valueCat: null,
      optionsCat: [
        { name: "Fantasy", code: "fts" },
        { name: "Fan Art", code: "fa" },
        { name: "Photography", code: "ph" },
      ],
      valueTrade: null,
      optionsTrade: [
        { name: "Aunction" },
        { name: "Offer to Adop" },
        { name: "Draw to Adop" },
        { name: "Set Price" },
      ],
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
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style></style>