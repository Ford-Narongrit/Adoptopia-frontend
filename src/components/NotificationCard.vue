<template>
  <div
    class="p-4 flex flex-row hover:bg-blueGray-100 cursor-pointer"
    @click="toPost()"
  >
    <img
      class="h-12 w-12 rounded-full mr-2"
      :src="getImagePath(profile)"
      alt=""
    />
    <div class="overflow-x-hidden">
      <div class="truncate" :title="text">{{ text }}</div>
      <div class="text-left text-sm">{{ notitime }}</div>
    </div>
    <hr />
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data(){
    return{
      notitime: "",
    }
  },
  props: {
    name: { type: String , default: "Name" },
    username: { type: String , default: "username" },
    text: { type: String , default: "~~~~~~~~~~~~~~" },
    time: { type: String , default: "" },
    profile: { type: String , default: "favicon.ico" },
    tradeID: { type: Number  , default: -1},
    tradeType: { type: String  , default: "trade-Type"},

  },
  created(){
    this.calTime()
  },
  methods:{
    calTime(){
      this.notitime = moment(this.time).fromNow(); ;
    },
    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },

    toPost(){
      
      if(this.tradeType === "follow"){
        this.$router.push({path:'/'+this.username+'/home'})
      }
      else if(this.tradeType !== "sale"){
        this.$router.push({path:'/'+this.tradeType+'/'+this.tradeID})
      }

    }
  }
};
</script>

<style></style>
