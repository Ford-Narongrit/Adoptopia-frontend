<template>
  <div class="my-font-eng text-white">
    <div class="border-b border-solid border-white">
      <div class="ml-14 mt-10">
        <b><h1 class="text-4xl">Draw To Adop
          <span>
            <router-link :to="{ path: '/dta-sug/' + postId, name: 'DtaSug', params: {id: postId, postInfo: postInfo} }">
              <button class="btn-sugges absolute">Suggestion</button>
            </router-link>
          </span>
        </h1></b>
      </div>

      <div class="mt-12 h-0">
        <coverflow :coverList="coverList" :coverWidth="230" :index="0" ></coverflow>
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
          <label  class="text-2xl">Requirement: Picture</label>
        </div>

        <!-- input image -->
        <input type="file" ref="file" style="display: none" @change="addImage"/>
        <div class="w-3/4 h-80 border-white border-2 relative bg-cover bg-center"
          @click="$refs.file.click()"
          @drop.prevent="addImage($event)"
          @dragover.prevent
          @mouseover="hoverImage = true"
          @mouseleave="hoverImage = false"
          :style="{ backgroundImage: 'url(' + `${dta_image}` + ')' }"
          tabindex="1"
        >
          <font-awesome-icon v-if="!dta_image" icon="camera" class="absolute w-full h-full flex justify-center items-center text-7xl text-white left-40"/>
          <div v-if="hoverImage" class="absolute w-full h-full flex justify-center items-center bg-black opacity-80 text-white text-xl">
            Upload Image
          </div>
        </div>

        <button class="btn-rounded absolute right-40 mt-6" @click="request()">
          Request
        </button>
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
import coverflow from 'vue-coverflow'
import UserStore from '../store/User.js'
import axios from "axios";
import Alert from "../helpers/Alert";
import Header from "@/helpers/Header";

export default {
  name: 'dta',
  data () {
    return {
      hoverImage: false,
      dta_image: "",
      postId: "",
      postInfo: "",
      
      adop_name: "",
      adop_cat: [],
      adop_agr: "",
      adop_image: [],
      coverList: [],

      users:[],
      name: "",

      form: {
        trade_id: "",
        status: 0,
        image: []
      },
    };
  },
  components: {
    coverflow
  },
  created() {
    if(this.$route.params !== null){
      this.postInfo = this.$route.params.postInfo
      this.postId = this.postInfo.id
      this.adop_name = this.postInfo.adopt.name
      this.adop_agr = this.postInfo.adopt.agreement

      this.form.trade_id = this.postInfo.id
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
  mounted(){
    this.fetchUser();
  },
  methods: {
    addImage(e) {
      let files = null;
      if (e.type === "drop") {
        files = e.dataTransfer.files;
      }
      else if (e.type === "change") {
        files = e.target.files;
      }
      if (files) {
        this.dta_image = URL.createObjectURL(files[0]);
        this.form.image = files[0];
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

    async request(){
      try {
        let res = await UserStore.dispatch("getMe");
        this.user = res.data;
      } catch (error) {
        Alert.window("error", "Unauthorized", "Please login before request image.");
        console.error(error);
      }
      let payload = new FormData();
      if(this.form.trade_id !== "" && this.form.image !== []){
        payload.append("trade_id", this.form.trade_id);
        payload.append("status", this.form.status);
        payload.append("image", this.form.image);
        console.log(this.form.image);
      }
      let config = Header.getHeaders({ "Content-Type": "multipart/form-data" });
      try {
        let res = await axios.post("/dta-sug", payload, config);
        console.log(res.data);
        Alert.mixin("success", "Request image successfully");
      } 
      catch (error) {
        this.errors = error.response.data.errors;
        Alert.window("error", "Request image failed", "Please select image.");
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