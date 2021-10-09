<template>
  <div class="my-font-eng text-white">
    <div class="border-b border-solid border-white">
      <div class="ml-14 mt-10">
        <b><h1 class="text-4xl">Offer To Adop
          <span>
            <router-link to="/ota-sug">
              <button class="btn-sugges absolute">Suggestion</button>
            </router-link>
          </span>
        </h1></b>
      </div>

      <div class="mt-12 h-0">
        <coverflow :coverList="coverList" :coverWidth="230" :index="2"></coverflow>
      </div>

      <div class="info -mt-20 py-16">
        <h2 class="py-3 text-3xl">Picture Name</h2>
        <h2 class="py-3 text-2xl">Name</h2>
        <h2 class="py-3 pb-12 text-2xl">Catagory:</h2>

        <div class="py-3 mb-3">
          <label  class="text-2xl">Offer: Adop</label>

          <router-link to="/ota-select">
            <button class="btn-rounded absolute right-40">Offer</button>
          </router-link>
        </div>

        <!-- adop image -->
        <div v-if="adop_image" class="w-3/4 h-auto border-white border-2 relative overflow-hidden">
          <img :src="getImagePath(adop_image)">
        </div>
        <div v-if="!adop_image" class="w-3/4 h-80 border-white border-2 relative overflow-hidden">
          <font-awesome-icon icon="user" class="absolute w-full h-full flex justify-center items-center text-7xl text-white left-40"/>
        </div>

        <button class="btn-rounded absolute right-40 mt-6">Request</button>
      </div>

      <br><br>   
  </div>
        
    <div class="text-2xl">
      <b><h1 class="text-4xl ml-14 mt-10 pb-12 pt-5">Agreement</h1></b>
      <div class="my-font-th ml-32">
        <p class="py-3">1. ไม่ขายต่อในราคาที่สูงกว่า(ยกเว้นกรณีมีรูปจากคอมมิชชัน)</p>
        <p class="py-3">2. ไม่แอบอ้างว่าเป็นผู้ออกแบบเอง</p>
        <p class="py-3">3. เมื่อนำภาพไปใช้ จะต้องใส่เครดิตทุกครั้ง</p>
        <p class="py-3">4. ไม่อนุญาติให้นำไปเเจก</p>
        <p class="py-3 pb-16">5. ดัดเเปลงได้เเต่ต้องยังเหลือเค้าโครงเดิม</p>
      </div>     
    </div>
  </div>
</template>

<script src="https://unpkg.com/@diracleo/vue-enlargeable-image/dist/vue-enlargeable-image.min.js"></script>
<script>
import coverflow from 'vue-coverflow';
import AdoptStore from "@/store/Adopt";
import VueFlexWaterfall from "vue-flex-waterfall";

export default {
  name: 'Ota',
    data () {
    return {
      adop_id: "",
      adop_image: "",
      adopts: [],

      coverList: [
        {
          cover: require('../assets/1.jpg'),
        }, {
          cover: require('../assets/2.jpg'),
        }, {
          cover: require('../assets/3.jpg'),
        }, {
          cover: require('../assets/4.jpg'),
        }, {
          cover: require('../assets/5.jpg'),
        },
      ],

    }
  },
  components: {
    coverflow,
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
    async fetch() {
      try {
        let res = await AdoptStore.dispatch("getAdopts_list");
        this.adopts = AdoptStore.getters.adopts_list;

        for(var i=0; i<this.adopts.length; i++){
          if(this.adopts[i].id === this.adop_id){
            this.adop_image = this.adopts[i].adopt_image[0].path;
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