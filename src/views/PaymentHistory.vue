<template>
  <div class="text-center my-font-eng">
    <h1 class="my-text-title text-white my-8">Payment History</h1>
    <div class="flex justify-around mt-8 w-1/3 mx-auto">
      <button
        @click="toHistory"
        class="w-52 px-4 py-2 rounded-full my-text-content text-white border-2 border-white hover:bg-blue-700"
      >
        History
      </button>
      <button
        class="w-52 px-4 py-2 rounded-full my-text-content text-white border-2 border-white bg-blue-700 cursor-default"
      >
        Payment History
      </button>
    </div>
    <Loading v-if="!loading"/>
    <div v-if="loading">
      <HistoryBoard v-if="data.length" :data="data" class="mt-8" />
      <PageCard
        v-if="allPages > 1"
        :allPages="allPages"
        :currPage="currPage"
        @update="updateCurrPage"
      />
    </div>
    <button class="text-white bg-blue-500 mt-6" @click="toTopup">
      TO TOPUP
    </button>
  </div>
</template>

<script>
import HistoryBoard from "@/components/HistoryBoard";
import Axios from "axios";
import UserStore from "../store/User";
import PageCard from "../components/PageCard.vue";
import Loading from "../components/Loading.vue";

export default {
  components: {
    HistoryBoard,
    PageCard,
    Loading
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
      loading: false,
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
    toTopup() {
      this.$router.push("/topup");
    },
    fetchData() {
      this.loading = false;
      Axios.get(`/payment-histories?page= ${this.currPage}`, {
        headers: {
          Authorization: "Bearer " + UserStore.getters.jwt,
        },
      }).then((response) => {
        // console.log(response.data);
        this.data = response.data.data;
        this.allPages = response.data.meta.last_page;
        this.loading = true;
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
