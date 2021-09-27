<template>
  <div class="bg-white p-6 flex flex-row">
    <img class="h-16 w-16 rounded-full mr-4" :src="`${profile}`" alt="" />
    <div>
      <h2>{{name}}</h2>
      <div>{{text}}</div>
      <div>{{notitime}}</div>
    </div>
    <hr />
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data(){
    return{
      notitime: ""
    }
  },
  props: {
    name: { type: String , default: "Name" },
    text: { type: String , default: "~~~~~~~~~~~~~~" },
    time: { type: String , default: "" },
    profile: { type: String , default: "favicon.ico" },
    
  },
  created(){
    this.calTime()
  },
  methods:{
    calTime(){
      this.notitime = moment(this.time).fromNow(); ;
    }
  }
};
</script>

<style></style>
