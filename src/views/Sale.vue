<template>
    <div class="my-font-eng sale text-white">
        <div class="border-b border-solid border-white">
            <b><h1 class="text-4xl ml-14 mt-10">For Sale</h1></b>

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

              <div class="py-3 pt-12">
                <label  class="text-2xl">250 Coin</label>
                <button class="btn-rounded absolute right-48">Purchase</button>
              </div>
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

export default {
  name: 'sale',
    data () {
    return {
      postInfo: "",
      adop_name: "",
      adop_cat: [],
      adop_agr: "",
      adop_image: [],
      coverList: [],
    }
  },
  components: {
    coverflow
  },
  created() {
    if(this.$route.params !== null){
      this.postInfo = this.$route.params.postInfo
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
}
</script>

<style lang="scss" scoped>
.info{
  margin-left: 65%;
}
</style>