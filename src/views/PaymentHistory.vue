<template>
  <div class="main-container">
    <h1 class="text-3xl text-white my-8">Payment History</h1>
    <div class="wrap-btn">
      <button @click="toHistory">History</button>
      <button class="disable">Payment History</button>
    </div>
    <HistoryBoard v-if="data.length" :data="data" />
    <PageCard
      v-if="allPages > 1"
      :allPages="allPages"
      :currPage="currPage"
      @update="updateCurrPage"
    />
    <button class="text-white bg-blue-500 mt-6" @click="toTopup">TO TOPUP</button>
  </div>
</template>

<script>
import HistoryBoard from "@/components/HistoryBoard";
import Axios from "axios";
import UserStore from "../store/User";
import PageCard from "../components/PageCard.vue";

export default {
  components: {
    HistoryBoard,
    PageCard,
  },
  data() {
    return {
      data: [
        // {
        // date: "",
        // name: "",
        // type: "",
        // amount: "",
        // },
      ],
      currPage: 1,
      allPages: "",
    };
  },
  created() {
    // console.log(UserStore.getters.jwt);
    this.fetchData();
  },
  methods: {
    toHistory() {
      this.$router.push("/history");
    },
    toTopup(){
      this.$router.push("/topup")
    },
    fetchData() {
      Axios.get(`/payment-histories?page= ${this.currPage}`, {
        headers: {
          Authorization: "Bearer " + UserStore.getters.jwt,
        },
      }).then((response) => {
        // console.log(response.data);
        this.data = response.data.data;
        this.allPages = response.data.meta.last_page;
        // console.log(this.lastPage);
      });
    },
    updateCurrPage(page) {
      this.currPage = page;
      this.fetchData();
      // console.log(this.currPage);
    },
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  text-align: center;
  .wrap-btn {
    display: flex;
    width: 500px;
    margin: 1em auto;
    justify-content: space-evenly;

    button {
      width: 140px;
      height: 40px;
      color: white;
      background-color: #1e63e9;
      border-radius: 30px;
    }
    .disable {
      background-color: #e5e5e5;
      color: black;
      cursor: default;
    }
  }
}</style
>>
