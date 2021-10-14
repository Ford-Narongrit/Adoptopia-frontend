<template>
  <div class="my-font-eng text-white">
    <div class="border-b border-solid border-white">
      <div class="ml-14 mt-10">
        <b><h1 class="text-4xl">Offer To Adop
          <span>
            <router-link :to="{ path: '/ota-sug/' + postId, name: 'OtaSug', params: {id: postId, postInfo: postInfo} }">
              <button class="btn-sugges absolute">Suggestion</button>
            </router-link>
          </span>
        </h1></b>
      </div>

      <div class="mt-12 h-0">
        <coverflow :coverList="coverList" :coverWidth="230" :index="0"></coverflow>
      </div>

      <div class="info -mt-20 py-16">
        <h2 class="py-3 text-3xl">{{ adop_name }}</h2>
        <h2 class="py-3 text-2xl">By: {{ findUserById() }}</h2>
        <h2 class="py-3 text-2xl">Catagory:</h2>
        <div class="text-white my-text-content rounded-lg w-2/3 my-block-focus">
          <span v-for="category in adop_cat" :key="category.id"
                class="bg-blue-400 px-2 rounded-lg inline-block m-1">
            {{ category }}
          </span>
        </div>

        <div class="py-3 mb-3">
          <label  class="text-2xl">Offer: Adop</label>

          <router-link :to="{ path: '/ota-select/' + postId, name: 'OtaSelect', params: {id: postId, postInfo: postInfo} }">
            <button class="btn-rounded absolute right-40">Offer</button>
          </router-link>
        </div>

        <!-- adop image -->
        <div v-if="ota_adop_image" class="w-3/4 h-auto border-white border-2 relative overflow-hidden">
          <img :src="getImagePath(ota_adop_image)">
        </div>
        <div v-if="!ota_adop_image" class="w-3/4 h-80 border-white border-2 relative overflow-hidden">
          <font-awesome-icon icon="user" class="absolute w-full h-full flex justify-center items-center text-7xl text-white left-40"/>
        </div>

        <button class="btn-rounded absolute right-40 mt-6" @click="request()">Request</button>
      </div>

      <br><br>   
  </div>
        
    <div class="text-2xl">
      <b><h1 class="text-4xl ml-14 mt-10 pb-12 pt-5">Agreement</h1></b>
      <div class="my-font-th ml-32">
        {{ adop_agr }}
      </div>     
    </div>
  </div>
</template>

<script src="https://unpkg.com/@diracleo/vue-enlargeable-image/dist/vue-enlargeable-image.min.js"></script>
<script>
import coverflow from 'vue-coverflow';
import AdoptStore from "@/store/Adopt";
import UserStore from '../store/User.js'
import axios from "axios";
import Header from "@/helpers/Header";
import Alert from "../helpers/Alert";

export default {
  name: 'ota',
    data () {
    return {
      ota_adop_id: "",
      ota_adop_image: "",
      adopts: [],
      postId: "",

      postInfo: "",
      adop_name: "",
      adop_cat: [],
      adop_agr: "",
      adop_image: [],
      coverList: [],

      users: [],
      name: "",

      form: {
        o_adop: "",
        o_trade: "",
      },
    }
  },
  components: {
    coverflow,
  },
  created() {
    if(this.$route.params !== null){
      this.ota_adop_id = this.$route.params.adop_id

      this.postInfo = this.$route.params.postInfo
      this.postId = this.postInfo.id
      this.adop_name = this.postInfo.adopt.name
      this.adop_agr = this.postInfo.adopt.agreement

      this.form.o_adop = this.ota_adop_id
      this.form.o_trade = this.postInfo.id

      for(var i=0; i<this.postInfo.adopt.category.length; i++){
        this.adop_cat.push(this.postInfo.adopt.category[i].name);
      }
      for(var j=0; j<this.postInfo.adopt.adopt_image.length; j++){
        this.adop_image.push(this.postInfo.adopt.adopt_image[j].path);
        this.coverList.push({
          cover: process.env.VUE_APP_APIURL + this.postInfo.adopt.adopt_image[j].path
        })
      }
    console.log(this.postInfo);
    console.log(this.coverList);
    }
  },
  mounted() {
    this.fetch();
    this.fetchUser();
  },
  methods: {
    async fetch() {
      try {
        let res = await AdoptStore.dispatch("getAdopts_list");
        this.adopts = AdoptStore.getters.adopts_list;

        for(var i=0; i<this.adopts.length; i++){
          if(this.adopts[i].id === this.ota_adop_id){
            this.ota_adop_image = this.adopts[i].adopt_image[0].path;
          }
        }
      } catch (error) {
        console.error(error.response);
      }
    },
    
    async fetchUser(){
      try {
        let res = await UserStore.dispatch("getAllUsers");
        this.users = UserStore.getters.users;
      } catch (error) {
        console.error(error.response);
      }
    },

    findUserById(){
      for(var i = 0;i < this.users.length;i++){
        if(this.users[i].id === this.postInfo.user_id){
          this.name = this.users[i].name;
          break;
        }
      }
      return this.name;
    },

    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },

    async request() {
      let payload = new FormData();
      let config = Header.getHeaders({ "Content-Type": "multipart/form-data" });
      if(this.form.o_adop !== "" && this.form.o_trade !== ""){
        payload.append("trade_id", this.form.o_trade);
        payload.append("adopt_id", this.form.o_adop);
        payload.append("status", 0);
        // console.log(this.form.o_trade);
        // console.log(this.form.o_adop);

        try {
          let res = await axios.post("/ota-sug", payload, config);
          console.log(res.data);
          Alert.mixin("success", "Request successfully");
        } catch (error) {
          this.errors = error.response.data;
          console.log(this.errors);
        Alert.window("error", "Fail to request adop", "Please select adop.");
        }
      }else{
        Alert.window("error", "Fail to request adop", "Please select adop.");
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.info{
  margin-left: 65%;
}
</style>