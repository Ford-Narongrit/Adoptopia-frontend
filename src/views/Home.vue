<template>
  <div>
    <div class="flex flex-nowrap py-8">
      <div class="flex flex-nowrap py-8">
        <label class="px-4 mt-2 text-white">Type</label>
        <multiselect 
          v-model="valueTrade"
          placeholder="Select one" 
          select-label="" 
          deselectLabel=""
          label="name"
          track-by="name"
          :options="optionsTrade" 
          :allow-empty="false" 
          :max-height="150">
        </multiselect>
      </div>
      <div class="flex flex-nowrap py-8">
        <label class="px-4 mt-2 text-white">Category</label>
        <multiselect
          v-model="valueCat"
          select-label=""
          tag-placeholder=""
          deselectLabel=""
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
    <vue-flex-waterfall
      :col="4"
      :col-spacing="15"
      :break-at="breakAt"
      :break-by-container="true"
      @order-update="onOrderUpdate"
    >
      <div v-for="image in images" :key="image.url" class="px-2">
        
        <router-link :to="{path:image.tag }">
          <img :src="require(`../assets/${image.url}`)" 
            height="200px"
            width="350px" />
        </router-link>
        px
      </div>
    </vue-flex-waterfall>
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
      images: [
        { url : "drawer.jpg", tag: "/ota" },
        { url : "slap.jpg", tag: "/dta" },
        { url : "Kiwi.jpg", tag: "/sale" },
        { url : "Camel.jpeg", tag: "/auction" },
        { url : "blessed.jpg", tag: "/ota" },
        { url : "Rino.jpg", tag: "/dta" },
        { url : "marr.jpg", tag: "/auction" },
        { url : "Cute.jpg", tag: "/sale" },
        { url : "marr8bit.jpg", tag: "/sale" },
        { url : "Lena.jpg", tag: "/dta"},
        { url : "seal.jpg", tag: "/ota"}
      ],
      selectedImage: null
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
    onOrderUpdate() {
      console.log('order updated');
    }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style></style>