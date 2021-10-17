<template>
  <div class="text-center my-font-eng">
    <h1 class="my-text-title text-white my-5">Payment History</h1>
    <div class="flex justify-around mt-5 w-1/3 mx-auto">
      <button
        @click="toHistory"
        class="w-48 p-2 rounded-full my-text-content text-white border-2 border-white hover:bg-blue-700"
      >
        Adop History
      </button>
      <button
        class="w-48 p-2 rounded-full my-text-content text-white border-2 border-white bg-blue-700 cursor-default"
      >
        Payment History
      </button>
    </div>
    <div class="flex items-center w-4/5 mx-auto mt-8">
      <div class="text-white mr-2">From:</div>
      <div class="relative">
        <input
          type="date"
          class="px-2 mr-4 my-text-content rounded-lg"
          :class="errors.dateFrom ? 'my-block-error ' : 'my-block-focus'"
          v-model="form.dateFrom"
        />
        <div v-if="errors.dateFrom" class="absolute -top-6 text-red-400">
          {{ errors.dateFrom[0] }}
        </div>
      </div>
      <div class="text-white mr-2">To:</div>
      <div class="relative">
        <input
          type="date"
          class="px-2 mr-4 my-text-content rounded-lg"
          :class="errors.dateTo ? 'my-block-error ' : 'my-block-focus'"
          v-model="form.dateTo"
        />
        <div v-if="errors.dateTo" class="absolute -top-6 text-red-400 w-96 text-left">
          {{ errors.dateTo[0] }}
        </div>
      </div>
      <div class="text-white mr-2">Type:</div>
      <select
        v-model="form.status"
        class="my-text-content rounded-lg px-2 py-1 my-block-focus mr-4"
      >
        <option disabled value="">Type</option>
        <option
          v-for="(type, index) in types"
          :key="index"
          class="hover:bg-black"
          >{{ type }}</option
        >
      </select>
      <button @click="filter" class="btn-rounded text-white mr-4">
        filter
      </button>
      <button
        @click="reset"
        class="btn-rounded text-white bg-red-500 hover:text-red-500"
      >
        reset
      </button>
    </div>
    <Loading v-if="!loading" />
    <div v-if="loading">
      <HistoryBoard v-if="data.length" :data="data" class="mt-4" />
      <PageCard
        v-if="allPages > 1"
        :allPages="allPages"
        :currPage="currPage"
        @update="updateCurrPage"
        class="w-2/3 mx-auto"
      />
      <div v-if="!data.length" class="text-white my-text-subtitle mt-8">
        You don't have payment history.
      </div>
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
    Loading,
  },
  data() {
    return {
      data: [],
      currPage: 1,
      allPages: "",
      loading: false,
      form: {
        dateFrom: "",
        dateTo: "",
        status: "all",
      },
      types: ["all", "deposit", "withdraw", "earn", "spend"],
      isFilter: false,
      errors: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    toHistory() {
      this.$router.push("/history");
    },
    async fetchData() {
      this.loading = false;
      let headers = Header.getHeaders();
      await Axios.get(
        `/payment-histories?page= ${this.currPage}`,
        headers
      ).then((response) => {
        this.data = response.data.data;
        this.allPages = response.data.meta.last_page;
        this.loading = true;
      });
    },
    updateCurrPage(page) {
      this.currPage = page;
      this.isFilter ? this.fetchSelectedData() : this.fetchData();
    },
    filter() {
      this.currPage = 1;
      this.isFilter = true;
      this.fetchSelectedData();
    },
    reset() {
      this.currPage = 1;
      this.isFilter = false;
      this.form.dateFrom = "";
      this.form.dateTo = "";
      this.errors = [];
      this.fetchData();
    },
    async fetchSelectedData() {
      this.loading = false;
      let headers = Header.getHeaders();
      console.log(headers);
      console.log(this.form);
      try {
        await Axios.post(
          `/payment-histories/search?page= ${this.currPage}`,
          this.form,
          headers
        ).then((response) => {
          console.log(response);
          this.data = response.data.data;
          this.allPages = response.data.meta.last_page;
          this.loading = true;
          this.errors = [];
        });
      } catch (error) {
        this.errors = error.response.data.errors;
        console.log(error.response.data.errors);
        this.loading = true;
      }
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
