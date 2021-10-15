<template>
  <div
    class="bg-white p-6 flex flex-row hover:bg-blueGray-100"
    @click="toPost()"
  >
    <img
      class="h-16 w-16 rounded-full mr-4"
      :src="getImagePath(profile)"
      alt=""
    />
    <div>
      <h2>{{ name }}</h2>
      <div>{{ text }}</div>
      <div>{{ notitime }}</div>
    </div>
    <hr />
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import Header from "@/helpers/Header";
export default {
  data(){
    return{
      notitime: "",
    }
  },
  props: {
    name: { type: String , default: "Name" },
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
      // '/trade'

      this.$router.push({path:'/'+this.tradeType+'/'+this.tradeID})

    }
  }
};
</script>

<style></style>
