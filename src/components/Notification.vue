<template>
  <div
    class="absolute w-80 shadow-xl z-20 mt-2 -right-8 my-font-eng bg-gray-200 rounded-lg" style="height:37rem"
    
  >
    <div class="text-left pl-8 pt-2 bg-shark-200 font-bold rounded-t-lg cursor-default">
      Notification
    </div>

    <div v-if="notiList.length > 0" class="overflow-auto  h-full bg-gray-200 rounded-b-lg ">
      <div v-for="(noti, index) in notiList" :key="index">
        <notification-card
          v-if="noti.trade_id !== null"
          :name="noti.user.name"
          :username="noti.user.username"
          :text="noti.text"
          :profile="noti.user.profile"
          :time="noti.created_at"
          :tradeID="noti.trade_id"
          :tradeType="noti.trade.type"
        />
        <notification-card
          v-if="noti.trade_id === null"
          :name="noti.user.name"
          :username="noti.user.username"
          :text="noti.text"
          :profile="noti.user.profile"
          :time="noti.created_at"
          :tradeType="'follow'"
        />
      </div>
    </div>
    <div v-if="notiList.length == 0 && !is_load" class="bg-gray-200  h-full flex justify-center items-center cursor-default rounded-b-lg ">

        <div class="">
            <font-awesome-icon icon="bell" class="text-3xl text-gray-500 " />
            <div>
            Nothing to show
            </div>
        </div>

    </div>
    <div v-if="is_load" class="bg-gray-200 h-full flex justify-center items-center cursor-default rounded-b-lg ">

        <div class="">
            <font-awesome-icon icon="spinner" class="text-3xl text-gray-500 animate-spin" />
            <div>
             Loading...
            </div>
        </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import NotificationCard from "../components/NotificationCard.vue";
import Header from "@/helpers/Header";
export default {
  data() {
    return {
      notiList: [],
      user: {},
      is_load: true,
    };
  },
  components: {
    NotificationCard,
  },
  created() {
    this.fetchNotification();
  },
  methods: {
    async fetchNotification() {
      let header = Header.getHeaders();
      
      try {
        let res = await axios.get("/notification", header);
        this.notiList = res.data;
        this.is_load = false
      } catch (error) {
        console.error(error);
      }
    },
    
  },
};
</script>

<style></style>
