<template>
  <div class="my-font-eng text-white">
    <div class="border-b border-solid border-white">
      <div class="ml-14 mt-10">
        <b><h1 class="text-4xl">Offer To Adop
          <span>
            <router-link :to="{ path: '/ota-sug/' + postId, name: 'OtaSug', params: {id: postId} }">
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
        <h2 class="py-3 text-2xl">By:</h2>
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

        <button class="btn-rounded absolute right-40 mt-6">Request</button>
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

    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },
  },
}
</script>

<style lang="scss" scoped>
.info{
  margin-left: 65%;
}
</style>