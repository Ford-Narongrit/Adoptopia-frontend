<template>
  <div class="text-center my-font-eng">
    <h1 class="my-text-title text-white my-8">History</h1>
    <div class="flex justify-around mt-8 w-1/3 mx-auto">
      <button
        class="w-48 p-2 rounded-full my-text-content text-white border-2 border-white bg-blue-700 cursor-default"
      >
        Adop History
      </button>
      <button
        @click="toPaymentHistory"
        class="w-48 p-2 rounded-full my-text-content text-white border-2 border-white hover:bg-blue-700"
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
        class="w-2/3 mx-auto"
      />
    </div>
  </div>
</template>

<script>
import HistoryBoard from "@/components/HistoryBoard";
import Axios from "axios";
import Header from "@/helpers/Header";
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
      data: [],
      currPage: 1,
      allPages: "",
      loading: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    toPaymentHistory() {
      this.$router.push("/payment/history");
    },
    async fetchData() {
      this.loading = false;
      let headers = Header.getHeaders();
      await Axios.get(`/adop-histories?page= ${this.currPage}`, headers).then((response) => {
        this.data = response.data.data;
        this.allPages = response.data.meta.last_page;
        this.loading = true;
      });
    },
    updateCurrPage(page) {
      this.currPage = page;
      this.fetchData();
    },
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  text-align: center;
  .title {
    font-size: 2em;
    margin-top: 1em;
  }

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
