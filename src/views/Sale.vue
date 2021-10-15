<template>
  <div class="my-font-eng sale text-white">
    <div class="border-b border-solid border-white">
      <b><h1 class="text-4xl ml-14 mt-10">For Sale</h1></b>

      <div class="mt-12 h-0">
        <coverflow v-if="wait" :coverList="coverList" :coverWidth="230" :index="0"></coverflow>
      </div>

      <div class="info -mt-20 py-16">
        <h2 class="py-3 text-3xl">{{ adop_name }}</h2>
        <h2 class="py-3 text-2xl">By: {{ findUserById() }}</h2>
        <h2 class="py-3 text-2xl">Catagory:</h2>
        <div class="text-white my-text-content rounded-lg w-2/3 my-block-focus">
          <span
            v-for="category in adop_cat"
            :key="category.id"
            class="bg-blue-400 px-2 rounded-lg inline-block m-1"
          >
            {{ category }}
          </span>
        </div>

        <div class="py-3 pt-12">
          <label class="text-2xl">{{ adop_price }} Coins</label>
          <button class="btn-rounded absolute right-48" @click="purchase">
            Purchase
          </button>
        </div>
      </div>

      <br /><br />
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
import axios from "axios";
import coverflow from "vue-coverflow";
import UserStore from "../store/User.js";
import TradeStore from "../store/Trade.js";
import AdoptStore from "../store/Adopt.js";
import Header from "@/helpers/Header";
import Alert from "../helpers/Alert";

export default {
  name: "sale",
  data() {
    return {
      wait: false,

      postId: "",
      postInfo: "",
      postAll: [],

      adop_name: "",
      adop_cat: [],
      adop_agr: "",
      adop_price: "",
      adop_image: [],
      coverList: [],

      users: [],
      name: "",
      user_me: {},
      status: "",

      form:{
        amount: 0
      },
    };
  },

  components: {
    coverflow,
  },

  created() {
    if (this.$route.params !== null) {
      this.postId = this.$route.params.id
    }
  },

  mounted() {
    this.fetchTrade();
    this.fetchUser();
    this.fetchMe();
  },

  methods: {
    async fetchTrade() {
      try {
        let res = await TradeStore.dispatch("getPost_Adops_list");
        this.postAll = TradeStore.getters.post_adops_list;

        for(var i=0; i<this.postAll.length; i++){
          if(this.postAll[i].id == this.postId){
            this.postInfo = this.postAll[i]
          }
        }
        console.log(this.postInfo);
        this.adop_name = this.postInfo.adopt.name
        this.adop_agr = this.postInfo.adopt.agreement
        this.adop_price = this.postInfo.price;
        for(var i=0; i<this.postInfo.adopt.category.length; i++){
          this.adop_cat.push(this.postInfo.adopt.category[i].name);
        }
        for(var j=0; j<this.postInfo.adopt.adopt_image.length; j++){
          this.adop_image.push(this.postInfo.adopt.adopt_image[j].path);
          this.coverList.push({
            cover: process.env.VUE_APP_APIURL + this.postInfo.adopt.adopt_image[j].path
          })
        }
        this.wait = true;

      } catch (error) {
        console.error(error.response);
      }
    },

    async fetchUser() {
      try {
        let res = await UserStore.dispatch("getAllUsers");
        this.users = UserStore.getters.users;
      } catch (error) {
        console.error(error.response);
      }
    },

    async fetchMe() {
      try {
        let res = await UserStore.dispatch("getMe");
        this.user_me = res.data;
      } catch (error) {
        console.error(error.response);
      }
    },

    findUserById() {
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].id === this.postInfo.user_id) {
          this.name = this.users[i].name;
          break;
        }
      }
      return this.name;
    },

    async purchase() {
      if (this.user_me.coin < this.postInfo.price) {
        console.log(this.errors);
        Alert.window(
          "error",
          "Purchase failed",
          "Insufficient coin, please make sure you have enough coin"
        );
      } else {
          this.form.amount = this.postInfo.price;
        try {
          let headers = Header.getHeaders();
          let res = await axios.put(
            "/spend", this.form , headers
          );
          let data = {
            status: "spend",
            amount: this.form.amount,
          };
          console.log(res.data);
          await axios.post(`/payment-histories`, data, headers);
          await axios.put(`/trade/close_sale/${this.postInfo.id}`, {}, headers);
          await axios.put(`/adopt/transfer/${this.postInfo.adopt.id}/${this.user_me.id}`, {}, headers);
          // await axios.put(`/user/${this.status}/${this.user_me.id}/${this.amount}`, {}, headers);
          Alert.mixin("success", "Purchase successfully");
        } catch (error) {
          this.error = error.response.data.errors
          Alert.mixin("error", `${this.error.amount[0]}. Please try again.`);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  margin-left: 65%;
}
</style>