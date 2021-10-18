<template>
  <div>
    <div class="my-text-title text-gray-100 py-1">
      POST
    </div>
    <div class="grid grid-cols-4 gap-3">
      <vue-flex-waterfall :col="4" :col-spacing="15" :break-by-container="true">
        <div
          v-for="post in posts"
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
import TradeStore from "@/store/Trade";
import VueFlexWaterfall from "vue-flex-waterfall";
import PopUpPost from "@/components/PopUpPost.vue";

export default {
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.fetchPost();
  },
  components: {
    PopUpPost,
    VueFlexWaterfall,
  },
  methods: {
    async fetchPost() {
      try {
        let res = await TradeStore.dispatch(
          "getPostByUserId",
          this.$route.params.username
        );
        this.posts = res.data;
      } catch (error) {
        console.error(error.response);
      }
    },
  },
};
</script>

<style></style>
