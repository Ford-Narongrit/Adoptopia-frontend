<template>
  <div class="w-full">
    <div class="mt-8 mb-6 ml-8 text-white text-3xl">Post</div>
    <div class="flex">
      <div class="w-2/3 h-full px-16 py-5 flex justify-center item-center">
        <div class="w-3/4 h-80 bg-green-500 relative">
          <div class="flex justify-center items-center h-full"></div>
        </div>
      </div>

      <div class="w-2/3">
        <div class=" justify-center h-full bg-shark-500">
          <div class="ml-8">
            <!-- Name -->
            <div class="space-y-1 w-4/5 flex justify-evenly mb-4">
              <label
                for="name"
                class="my-text-content w-32 items-center flex text-white "
                >Name:
              </label>
              <div class="text-white">{{ name }}</div>
              <!-- <input
                type="text"
                placeholder="Name"
                class="my-text-content rounded-lg w-2/3 px-2 py-1 my-block-focus"
                v-model="form.name"
              /> -->
            </div>

            <!--Catagory -->
            <div class="space-y-1 w-4/5 flex justify-evenly mb-4 text-white">
              <label
                for="catagory"
                class="my-text-content w-32 items-center flex text-white"
                >Category:
              </label>
              <span
                v-for="category in categories"
                :key="category.id"
                class="bg-blue-400 px-1 rounded-lg inline-block m-1 my-text-base"
              >
                {{ category }}
              </span>
              <!-- <select
                v-model="form.catagory"
                class="my-text-content rounded-lg w-2/3 px-2 py-1 my-block-focus"
              >
                <option disabled value="">Please select a catagory</option>
                <option v-for="(catagory, index) in categories" :key="index">{{
                  catagory
                }}</option>
              </select> -->
            </div>

            <!--Agreement -->
            <div class="space-y-1 w-4/5 flex justify-evenly mb-4">
              <label for="agreement" class="my-text-content w-32 text-white"
                >Agreement:
              </label>
              <div class="text-white">{{ agreement }}</div>
              <!-- <textarea
                type="text"
                placeholder="Agreement"
                class="my-text-content rounded-lg w-2/3 h-40 px-2 py-1 my-block-focus"
                v-model="form.agreement"
              /> -->
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
                for="type"
                class="my-text-content w-32 items-center flex text-white"
              >
              </label>
              <div class="flex w-2/3 justify-between">
                <div class="relative">
                  <input
                    type="text"
                    class="my-text-content rounded-lg w-28 px-2 pl-10 py-1 my-block-focus text-right"
                    v-model="form.sb"
                  />
                  <div class="my-text-content absolute top-1 left-1">SB:</div>
                </div>
                <div class="relative">
                  <input
                    type="text"
                    class="my-text-content rounded-lg w-28 px-2 pl-10 py-1 my-block-focus text-right"
                    v-model="form.ab"
                  />
                  <div class="my-text-content absolute top-1 left-1">AB:</div>
                </div>
                <div class="relative">
                  <input
                    type="text"
                    class="my-text-content rounded-lg w-28 px-2 pl-10 py-1 my-block-focus text-right"
                    v-model="form.bid"
                  />
                  <div class="my-text-content absolute top-1 left-1">BID:</div>
                </div>
              </div>
            </div>
            <div class="space-y-1 w-4/5 flex justify-evenly mb-4">
              <label
                for="type"
                class="my-text-content w-32 items-center flex text-white"
                >Duration:
              </label>
              <select
                v-model="duration"
                class="my-text-content rounded-lg w-2/3 px-2 py-1 my-block-focus "
              >
                <option disabled value="">Please select a duration</option>
                <!-- Auction, OTA, DTA, SP -->
                <option
                  v-for="(duration, index) in durations"
                  :key="index"
                  class="hover:bg-black"
                  >{{ duration }}</option
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
                placeholder="Price"
                class="my-text-content rounded-lg w-2/3 px-2 py-1 my-block-focus"
                v-model="form.sb"
              />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <button
        class="bg-blue-600 rounded-full w-28 p-2 text-white my-text-content hover:bg-blue-400 my-block-focus"
        @click="post()"
      >
        Post
      </button>
    </div>

    <div class="grid grid-cols-4 gap-3">
      <vue-flex-waterfall :col="4" :col-spacing="15" :break-by-container="true">
        <div
          v-for="adopt in adopts"
          :key="adopt.id"
          class="my-2 relative"
          @click="selectAdopt(adopt.id)"
        >
          <display-post-image :adopt="adopt" />
        </div>
      </vue-flex-waterfall>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Alert from "../helpers/Alert";
import AdoptStore from "@/store/Adopt";
import UserStore from "../store/User";
import VueFlexWaterfall from "vue-flex-waterfall";
import DisplayPostImage from "@/components/DisplayPostImage.vue";
import Header from "@/helpers/Header";
import { duration } from 'moment';

export default {
  data() {
    return {
      adopts: [],
      adopt_id: 0,
      types: ["Auction", "OTA", "DTA", "For Sale"],
      durations: ["1 Day", "3 Days", "5 Days", "7 Days", "10 Days"],
      name: "",
      categories: [],
      agreement: "",
      duration: "",
      isAuction: false,
      isSP: false,
      form: {
        type: "",
        sb: 0,
        ab: 0,
        bid: 0,
        eb : "",
        images: [],
      },
    };
  },
  components: {
    DisplayPostImage,
    VueFlexWaterfall,
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async post() {
      let payload = new FormData();
      let config = Header.getHeaders({ "Content-Type": "multipart/form-data" });

      if(this.adopt_id !== 0 && this.form.type !== ""){
        payload.append("adopt_id", this.adopt_id);
        payload.append("type", this.form.type);
        payload.append("status", "on");

        if(this.form.type === 'OTA' || this.form.type === 'DTA'){
          try {
            let res = await axios.post("/trade-adop", payload, config);
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
        if(this.form.type === 'Auction'){
          payload.append("start_price", this.form.sb);
          payload.append("auto_buy", this.form.ab);
          payload.append("each_bit", this.form.bid);
          if(this.duration === '1 Day'){
            payload.append("end_bit", "24:00:00");
          }
          if(this.duration === '3 Days'){
            payload.append("end_bit", "72:00:00");
          }
          if(this.duration === '5 Days'){
            payload.append("end_bit", "120:00:00");
          }
          if(this.duration === '7 Days'){
            payload.append("end_bit", "168:00:00");
          }
          if(this.duration === '10 Days'){
            payload.append("end_bit", "240:00:00");
          }
          try {
            let res = await axios.post("/trade-coin", payload, config);
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
        if(this.form.type === 'For Sale'){
          payload.append("type", "sale");
          payload.append("start_price", this.form.sb);
          try {
            let res = await axios.post("/trade-coin", payload, config);
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
      } catch (error) {
        console.error(error.response);
      }
    },

    async selectAdopt(id) {
      try {
        let res = await UserStore.dispatch("getMe");
        this.user = res.data;
      } catch (error) {
        Alert.window("error", "Unauthorized", "Please login before select adopt.");
        console.error(error);
      }

      this.categories = [];
      for(var i=0; i<this.adopts.length; i++){
        if(this.adopts[i].id === id){
          this.name = this.adopts[i].name;
          for(var j=0; j<this.adopts[i].category.length; j++){
            this.categories.push(this.adopts[i].category[j].name);
          }
          this.agreement = this.adopts[i].agreement;
          this.adopt_id = this.adopts[i].id;
          //console.log(this.adopt_id);
        }
      }
    },

  },
  computed: {
    adopts: function() {
      this.adopts.sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
      });
      return this.adopts;
    },
  },
};
</script>

<style lang="scss" scoped></style>>
