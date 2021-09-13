<template>
  <div class="">
      <hr>
    <div class="flex justify-center ...">
      <div class="text-4xl" v-if="topupStatus">Top up</div>
      <div class="text-4xl" v-if="withdrawStatus">Withdraw</div>
    </div>
    <div class="flex justify-center mt-8">
      <button
        class="mr-12 px-4 py-2 rounded-full text-sm font-medium border-0 focus:outline-none focus:ring transition text-blue-600 bg-blue-50 hover:text-blue-800 hover:bg-blue-100 active:bg-blue-200 focus:ring-blue-300"
        type="submit"
        @click="topupBtn"
      >
        Top up
      </button>
      <button
        class="ml-12 px-4 py-2 rounded-full text-sm font-medium border-0 focus:outline-none focus:ring transition text-blue-600 bg-blue-50 hover:text-blue-800 hover:bg-blue-100 active:bg-blue-200 focus:ring-blue-300"
        type="submit"
        @click="withdraw"
      >
        Withdraw
      </button>
    </div>
    <div class="flex justify-center mt-8">
      <div>
        1 coin = 1 bath
      </div>
    </div>
    <div
      class="text-white w-2/4 m-auto text-4xl  mt-8"
      style="background-color:#272727"
    >
      <div class="px-8 pt-12 pb-8 ">
        <div class="table text-center">
          <label class="table-cell w-3/5" v-if="topupStatus">Top up amount:</label>
          <label class="table-cell w-3/5" v-if="withdrawStatus">Withdraw amount:</label>
          <span class="table-cell w-1/5  ">
            <input
              class="w-full text-green-400"
              style="background-color:#272727;"
              type="number"
              name="topup"
              id=""
              onfocus="this.value=''"
              min="0"
              v-model="topup"
              @change="inputChange"
            />
          </span>
          <p class="table-cell w-1/5">B</p>
        </div>
        <div class="mt-6">
          <div class="inline-block w-3/5 text-center" v-if="topupStatus">Coin receive:</div>
          <div class="inline-block w-3/5 text-center" v-if="withdrawStatus">Coin lose:</div>
          <div class="inline-block w-1/5 text-green-400">{{this.coin }}</div>
          <div class="inline-block w-1/5 text-center">B</div>
        </div>
        <div class="mt-6 text-center">
          <button @click="click">confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

let api = "http://127.0.0.1:8000/api/user/topup/1/";
export default {
  data() {
    return {
      topup: 0,
      coin: 0,
      topupStatus: 1,
      withdrawStatus: 0
    };
  },
  methods: {
    click() {
      console.log(this.topup);
      api += this.topup.toString();
      console.log(api);
      axios.put(api).then((response) => {
        console.log(response);
        console.log(response.data);
      });
    },
    topupBtn(){
        this.topupStatus = 1
        this.withdrawStatus = 0
    },
    withdraw(){
        this.withdrawStatus = 1;
        this.topupStatus = 0


    },
     inputChange(){
         console.log("hello");
        console.log(this.topup);
         this.coin = this.topup

    }
  },
};
</script>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
