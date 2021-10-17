<template>
  <div class="my-font-eng">
    <div class="flex justify-center my-4">
      <div class="my-text-title text-white" v-if="topupStatus">Top up</div>
      <div class="my-text-title text-white" v-if="withdrawStatus">Withdraw</div>
    </div>
    <div class="flex justify-around mt-8 w-1/3 mx-auto">
      <button
        class="w-36 px-4 py-2 rounded-full my-text-content text-white border-2 border-white hover:bg-blue-700"
        :class="topupStatus ? 'bg-blue-700 cursor-default' : ''"
        type="submit"
        @click="topupBtn"
        :disabled="topupStatus == 1"
      >
        Top up
      </button>
      <button
        class="w-36 px-4 py-2 rounded-full my-text-content text-white border-2 border-white hover:bg-blue-700"
        :class="withdrawStatus ? 'bg-blue-700 cursor-default' : ''"
        type="submit"
        @click="withdrawBtn"
        :disabled="withdrawStatus == 1"
      >
        Withdraw
      </button>
    </div>
    <div
      class="w-2/4 mx-auto mt-8 p-4 rounded-lg"
      style="background-color:#1344A5"
    >
      <div class="my-text-subtitle text-white ">Exchange rate</div>
      <div class="flex justify-center mt-4 text-white my-text-subtitle ">
        1 Coin = 1 Baht
      </div>
      <div class="flex justify-center items-center mt-6">
        <label class="text-white my-text-content mx-2" v-if="topupStatus"
          >Top up Amount:</label
        >
        <label class="text-white my-text-content mx-2" v-if="withdrawStatus"
          >Withdraw Amount:</label
        >
        <div class="relative">
          <input
            class="w-36 h-8 rounded-lg mx-2 bg-white text-right px-2 my-text-base font-semibold"
            type="number"
            name="amount"
            id=""
            onfocus="this.value=''"
            min="0"
            v-model="form.amount"
            @change="inputChange"
            :class="error ? 'my-block-error' : 'my-block-focus'"
          />
          <div
            v-if="error"
            class="text-red-400 w-96 flex-none mb-4 absolute left-2 "
          >
            {{ error.amount[0] }}
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-6 w-2/3 mx-auto mt-8">
        <div
          v-for="(amountVal, index) in amounts"
          :key="index"
          class="w-32 h-12 bg-white flex justify-center items-center my-text-base font-semibold mx-auto rounded-lg cursor-pointer transform translate hover:scale-125 duration-300"
          @click="setAmount(amountVal)"
        >
          {{ amountVal }}
        </div>
      </div>
      <div class="mt-6 flex justify-center">
        <div class="text-white my-text-content" v-if="topupStatus">
          Coin receive:
        </div>
        <div class="text-white my-text-content" v-if="withdrawStatus">
          Coin lose:
        </div>
        <div class="text-white my-text-content w-32 text-right">
          {{ coin }}
        </div>
      </div>
    </div>
    <div class="mt-8 text-center ">
      <button
        @click="confirm"
        class="my-text-base uppercase bg-white p-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transform translate hover:scale-110 duration-300"
      >
        c o n f i r m
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserStore from "../store/User";
import Header from "@/helpers/Header";
import Alert from "../helpers/Alert";

export default {
  data() {
    return {
      form: {
        amount: 0,
      },
      coin: 0,
      topupStatus: 1,
      withdrawStatus: 0,
      user: {},
      amounts: [25, 50, 100, 200, 500, 1000],
      error: "",
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async confirm() {
      let status = "";
      this.topupStatus ? (status = "deposit") : (status = "withdraw");
      try {
        let headers = Header.getHeaders();
        let res = await axios.put(`/${status}`, this.form, headers);
        let data = {
          status: status,
          amount: this.form.amount,
        };
        await axios.post(`/payment-histories`, data, headers);
        let is_confirm = await Alert.yesNo("Please confirm your payment.");
        if(is_confirm){
          this.$router.push(`/${this.user.username}/home`);
          Alert.mixin("success", `${status} successfully`);
        }else{
          this.clearForm()
        }
      } catch (error) {
        this.error = error.response.data.errors;
        Alert.mixin("error", `${this.error.amount[0]}. Please try again.`);
      }
    },
    topupBtn() {
      this.topupStatus = 1;
      this.withdrawStatus = 0;
      this.clearForm();
    },
    withdrawBtn() {
      this.withdrawStatus = 1;
      this.topupStatus = 0;
      this.clearForm();
    },
    inputChange() {
      this.coin = parseFloat(this.form.amount);
      this.error = "";
    },
    setAmount(amount) {
      this.form.amount = amount;
      this.inputChange();
    },
    async fetch() {
      try {
        let res = await UserStore.dispatch("getMe");
        this.user = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    clearForm() {
      this.form.amount = 0;
      this.error = "";
      this.coin = 0;
    },
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
