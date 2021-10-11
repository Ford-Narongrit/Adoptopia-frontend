<template>
  <div class="w-full my-font-eng">
    <div class="ml-14 mt-10 mb-6">
      <b><h1 class="text-4xl text-white">Post</h1></b>
    </div>

    <div class="flex">
      <!-- adop image -->
      <div class="w-2/3 px-16 py-5 ml-24 justify-center item-center ">
        <div v-if="adop_image" class="w-3/4 h-auto border-white border-2 relative overflow-hidden">
          <img :src="getImagePath(adop_image)">
        </div>
        <div v-if="!adop_image" class="w-3/4 h-80 border-white border-2 relative overflow-hidden">
          <font-awesome-icon icon="user" class="absolute w-full h-full flex text-7xl text-white left-48"/>
        </div>
      </div>

      <div class="w-2/3">
        <div class=" justify-center h-full bg-shark-500">
          <div class="ml-8">
            <!-- Name -->
            <div class="space-y-1 w-4/5 py-1 flex justify-evenly mb-4">
              <label
                for="name"
                class="my-text-content w-32 items-center flex text-white "
                >Name:
              </label>
              <div class="text-white my-text-content rounded-lg w-2/3 px-2 my-block-focus">{{ name }}</div>
            </div>

            <!--Catagory -->
            <div class="space-y-1 w-4/5 py-1 flex justify-evenly mb-4 text-white">
              <label
                for="catagory"
                class="my-text-content w-32 items-center flex text-white"
                >Category:
              </label>
              <div class="text-white my-text-content rounded-lg w-2/3 my-block-focus">
                <span
                  v-for="category in categories"
                  :key="category.id"
                  class="bg-blue-400 px-2 rounded-lg inline-block m-1"
                >
                  {{ category }}
                </span>
              </div>
            </div>

            <!--Agreement -->
            <div class="space-y-1 py-1 w-4/5 flex justify-evenly mb-4">
              <label for="agreement" class="my-text-content w-32 text-white"
                >Agreement:
              </label>
              <div class="text-white my-text-content rounded-lg w-2/3 px-2 my-block-focus">{{ agreement }}</div>
            </div>

            <!--Type -->
            <div class="space-y-1 w-4/5 flex justify-evenly mb-4">
              <label
                for="type"
                class="my-text-content w-32 items-center flex text-white"
                >Type:
              </label>
              <select
                v-model="form.type"
                class="my-text-content rounded-lg w-2/3 px-2 py-1 my-block-focus"
              >
                <option disabled value="">Please select a type</option>
                <!-- Auction, OTA, DTA, SP -->
                <option
                  v-for="(type, index) in types"
                  :key="index"
                  class="hover:bg-black"
                  >{{ type }}</option
                >
              </select>
            </div>
            <div class="space-y-1 w-4/5 flex justify-evenly mb-4">
              <label
                for="price"
                class="my-text-content w-32 items-center flex text-white "
                >Price:
              </label>
              <input
                type="text"
                placeholder="Please input your price tag"
                class="my-text-content rounded-lg w-2/3 px-2 py-1 my-block-focus"
                v-model="form.price"
              />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center my-font-eng-b text-white">
      <router-link to="/post-select">
        <button class="mt-4 select btn-sugges absolute">
          Select Adop
        </button>
      </router-link>
      <button class="mt-4 post btn-sugges absolute" @click="post()">
        Post
      </button>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Alert from "../helpers/Alert";
import AdoptStore from "@/store/Adopt";
import UserStore from "../store/User";
import VueFlexWaterfall from "vue-flex-waterfall";
import Header from "@/helpers/Header";

export default {
  data() {
    return {
      adopts: [],
      adop_id: 0,
      adop_image: "",
      name: "",
      categories: [],
      agreement: "",

      types: ["OTA", "DTA", "For Sale"],
      isAuction: false,
      isSP: false,
      form: {
        type: "",
        price : "",
        images: [],
      },
    };
  },
  components: {
    VueFlexWaterfall,
  },
  created() {
    if(this.$route.params !== null){
      this.adop_id = this.$route.params.adop_id
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async post() {
      let payload = new FormData();
      let config = Header.getHeaders({ "Content-Type": "multipart/form-data" });
      console.log(this.adop_id);
      console.log(this.form.type);
      if(this.adop_id !== 0 && this.form.type !== ""){
        payload.append("adopt_id", this.adop_id);
        payload.append("type", this.form.type);
        payload.append("status", "on");

        if(this.form.type === 'OTA' || this.form.type === 'DTA'){
          try {
            let res = await axios.post("/trade", payload, config);
            console.log(res.data);
          } catch (error) {
            this.errors = error.response.data;
            console.log(this.errors);
            Alert.window(
                "error",
                "Add adopt failed",
                "Sorry, an unexpected error occurred. Please try again."
              );
            }
          //console.log("ota");
        }
        if(this.form.type === 'For Sale'){
          payload.append("type", "sale");
          payload.append("price", this.form.price);
          try {
            let res = await axios.post("/trade", payload, config);
            console.log(res.data);
          } catch (error) {
            this.errors = error.response.data;
            console.log(this.errors);
          Alert.window(
              "error",
              "Add adopt failed",
              "Sorry, an unexpected error occurred. Please try again."
            );
          }
        }
        Alert.mixin("success", "Post successfully");
      }else{
        Alert.window("error", "Fail to post adop", "Please select adop and its post type.");
      }
    },

   async fetch() {
      try {
        let res = await AdoptStore.dispatch("getAdopts_list");
        this.adopts = AdoptStore.getters.adopts_list;

        for(var i=0; i<this.adopts.length; i++){
          if(this.adopts[i].id === this.adop_id){
            this.adop_image = this.adopts[i].adopt_image[0].path;
            this.name = this.adopts[i].name;
            for(var j=0; j<this.adopts[i].category.length; j++){
              this.categories.push(this.adopts[i].category[j].name);
            }
            this.agreement = this.adopts[i].agreement;
          }
        }
      } catch (error) {
        console.error(error.response);
      }
    },

    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },

  },
};
</script>

<style lang="scss" scoped>
.select{
  margin-right: 60%;
}
.post{
  margin-right: 8%;
}
</style>>
