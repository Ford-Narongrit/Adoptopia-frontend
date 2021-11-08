<template>
  <div class="my-font-eng text-white">
    <div class="flex flex-wrap">
      <b
        ><h1 class="text-4xl ml-14 mt-10">
          Draw To Adop
          <span v-if="!loading">
            <router-link
              :to="{
                path: '/dta-sug/' + postId,
                name: 'DtaSug',
                params: { id: postId },
              }"
            >
              <button v-if="checkIfOwner()" class="btn-sugges absolute mt-1">
                Suggestion
              </button>
            </router-link>
          </span>
        </h1></b
      >
      <div v-if="!loading" class="flex flex-wrap">
        <report v-if="!checkIfOwner()"
          :post="postInfo"
          :report_list="['This post is inappropriate', 'Duplicate post', 'Plagiarism']"
          type="Post"
          class="mt-10 px-5 z-10"
        />        
      </div>

    </div>

    <Loading v-if="loading" />
    <div v-if="!loading">
      <div class="border-b border-solid border-white">
        <div class="m-9 h-0">
          <coverflow
            style="z-index: 0;"
            v-if="wait"
            :coverList="coverList"
            :coverWidth="230"
            :width="900"
            :index="0"
          ></coverflow>
        </div>

        <div class="info -mt-20 py-16">
          <h2 class="py-3 text-3xl">{{ adop_name }}</h2>
          <router-link
            :to="{
              path: '/' + this.owner.username + '/home',
            }"
            class="hover:underline"
          >
            <h2 class="py-3 text-2xl">By: {{ this.owner.name }}</h2>
          </router-link>
          <h2 class="py-3 text-2xl">
            Catagory:
            <span
              class="text-white my-text-content rounded-lg w-2/3 my-block-focus"
            >
              <span
                v-for="category in adop_cat"
                :key="category.id"
                class="bg-blue-400 px-2 rounded-lg inline-block m-1"
              >
                {{ category }}
              </span>
            </span>
          </h2>

          <button
            v-if="checkIfOwner()"
            class="
              btn-rounded
              absolute
              right-48
              mt-6
              bg-red-500
              hover:text-red-500
            "
            @click="deletePost"
          >
            Delete
          </button>

          <div v-if="!checkIfOwner()">
            <div class="py-3 mb-3">
              <label class="text-2xl">Requirement: Picture</label>
            </div>

            <!-- input image -->
            <input
              type="file"
              ref="file"
              style="display: none"
              @change="addImage"
            />
            <div
              class="
                w-3/4
                h-80
                border-white border-2
                relative
                bg-cover bg-center
              "
              @click="$refs.file.click()"
              @drop.prevent="addImage($event)"
              @dragover.prevent
              @mouseover="hoverImage = true"
              @mouseleave="hoverImage = false"
              :style="{ backgroundImage: 'url(' + `${dta_image}` + ')' }"
              tabindex="1"
            >
              <font-awesome-icon
                v-if="!dta_image"
                icon="camera"
                class="
                  absolute
                  w-full
                  h-full
                  flex
                  justify-center
                  items-center
                  text-7xl text-white
                  left-40
                "
              />
              <div
                v-if="hoverImage"
                class="
                  absolute
                  w-full
                  h-full
                  flex
                  justify-center
                  items-center
                  bg-black
                  opacity-80
                  text-white text-xl
                "
              >
                Upload Image
              </div>
            </div>

            <button
              class="btn-rounded absolute right-40 mt-6"
              @click="request()"
            >
              Request
            </button>
          </div>
        </div>
        <br /><br />
      </div>

      <div class="text-2xl">
        <b><h1 class="text-4xl ml-14 mt-10 pb-12 pt-5">Agreement</h1></b>
        <div class="my-font-th ml-32 text-white mark-content" v-html="compiledMarkdown(adop_agr)">
        </div>
      </div>
      <br><br><br>
    </div>
  </div>
</template>

<script src="https://unpkg.com/@diracleo/vue-enlargeable-image/dist/vue-enlargeable-image.min.js"></script>
<script>
import coverflow from "vue-coverflow";
import UserStore from "../store/User.js";
import TradeStore from "../store/Trade.js";
import Report from "../components/Report.vue";
import axios from "axios";
import Alert from "../helpers/Alert";
import Header from "@/helpers/Header";
import Loading from "../components/Loading.vue";
import DtaStore from "../store/Dta.js";
import marked from "marked";

export default {
  name: "dta",
  data() {
    return {
      wait: false,
      hoverImage: false,
      loading: true,
      dta_image: "",

      postId: "",
      postInfo: "",
      postAll: [],

      adop_name: "",
      adop_cat: [],
      adop_agr: "",
      adop_image: [],
      coverList: [],

      owner: {},
      user_me: {},

      dtaPost: [],
      dta_images: [],

      form: {
        trade_id: "",
        status: 0,
        image: [],
      },
    };
  },
  components: {
    coverflow,
    Loading,
    Report,
  },
  created() {
    if (this.$route.params !== null) {
      this.postId = this.$route.params.id;
    }
  },

  mounted() {
    this.fetchTrade();
    this.fetchMe();
    this.fetchDta();
  },

  methods: {
    addImage(e) {
      let files = null;
      if (e.type === "drop") {
        files = e.dataTransfer.files;
      } else if (e.type === "change") {
        files = e.target.files;
      }
      if (files) {
        this.dta_image = URL.createObjectURL(files[0]);
        this.form.image = files[0];
      }
    },

    async fetchTrade() {
      try {
        let res = await TradeStore.dispatch("getPost_Adops_list");
        this.postAll = TradeStore.getters.post_adops_list;

        for (var i = 0; i < this.postAll.length; i++) {
          if (this.postAll[i].id == this.postId) {
            this.postInfo = this.postAll[i];
          }
        }
        this.form.trade_id = this.postInfo.id;
        this.adop_name = this.postInfo.adopt.name;
        this.adop_agr = this.postInfo.adopt.agreement;
        for (var i = 0; i < this.postInfo.adopt.category.length; i++) {
          this.adop_cat.push(this.postInfo.adopt.category[i].name);
        }
        for (var j = 0; j < this.postInfo.adopt.adopt_image.length; j++) {
          this.adop_image.push(this.postInfo.adopt.adopt_image[j].path);
          this.coverList.push({
            cover:
              process.env.VUE_APP_APIURL +
              this.postInfo.adopt.adopt_image[j].path,
          });
        }
        this.wait = true;
        this.fetchOwner();
      } catch (error) {
        console.error(error.response);
      }
    },

    async fetchDta() {
      try {
        let res = await DtaStore.dispatch("getDta_image_list");
        this.dta_images = DtaStore.getters.dta_image_list;

        for (var i = 0; i < this.dta_images.length; i++) {
          if (this.dta_images[i].trade_id == this.postId) {
            this.dtaPost.push(this.dta_images[i]);
            console.log(this.dtaPost);
          }
        }
      } catch (error) {
        console.error(error.response);
      }
    },

    async fetchMe() {
      try {
        let res = await UserStore.dispatch("getMe");
        this.user_me = res.data;
      } catch (error) {
        console.error(error.response);
      }
    },

    async fetchOwner() {
      try {
        let headers = Header.getHeaders();
        let res = await axios.get(
          `/user/owner/${this.postInfo.user_id}`,
          headers
        );
        this.owner = res.data;
        this.loading = false;
      } catch (error) {
        console.error(error.response);
      }
    },

    async request() {
      try {
        let res = await UserStore.dispatch("getMe");
        this.user = res.data;
      } catch (error) {
        Alert.window(
          "error",
          "Unauthorized",
          "Please login before request image."
        );
        console.error(error);
      }
      let payload = new FormData();
      if (this.form.trade_id !== "" && this.form.image !== []) {
        payload.append("trade_id", this.form.trade_id);
        payload.append("status", this.form.status);
        payload.append("image", this.form.image);
        console.log(this.form.image);
      }
      let config = Header.getHeaders({ "Content-Type": "multipart/form-data" });
      try {
        let res = await axios.post("/dta-sug", payload, config);
        console.log(res.data);
        Alert.mixin("success", "Request successfully");
        this.$router.push("/");
      } catch (error) {
        this.errors = error.response.data.errors;
        Alert.window("error", "Request image failed", "Please select image.");
      }
    },

    checkIfOwner() {
      if (this.postInfo.user_id === this.user_me.id) {
        return true;
      } else {
        return false;
      }
    },

    compiledMarkdown(text) {
      return marked(text);
    },

    async deletePost() {
      if (this.dtaPost[0] != null) {
        Alert.mixin(
          "error",
          "You can't delete this post, because it's already have a request"
        );
      } else {
        try {
          let isConfirm = await Alert.yesNo("This action cannot be undone");
          if (isConfirm) {
            let headers = Header.getHeaders();
            await axios.put(
              `/trade/close_sale/${this.postInfo.id}`,
              {},
              headers
            );
            await axios.delete(`/trade/delete/${this.postInfo.id}`, headers);
            await axios.put(
              `/adopt/unUse/${this.postInfo.adopt.id}`,
              {},
              headers
            );
            Alert.mixin("success", "Delete successfully");
            this.$router.push("/");
          }
        } catch (error) {
          console.error(error.response);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  margin-left: 65%;
}
</style>