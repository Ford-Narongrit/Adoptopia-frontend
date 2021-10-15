<template>
  <div class="grid grid-cols-1">
    <h1 class="flex justify-center text-7xl my-8 text-white">Notification</h1>
    <div class="justify-self-center bg-white h-screen w-3/5 " >
      <div v-for="(noti, index) in notiList" :key="index">
        <notification-card
          :name="noti.user.name"
          :text="noti.text"
          :profile="noti.user.profile"
          :time="noti.created_at"
          :tradeID="noti.trade_id"
          :tradeType="noti.trade.type"
        />
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NotificationCard from "../components/NotificationCard.vue";
import UserStore from "@/store/User";
import Header from "@/helpers/Header";

export default {
  data() {
    return {
      notiList: [],
      user: {},
    };
  },
  components: {
    NotificationCard,
  },
  created() {
    this.fetchUser();
    this.setNotiToSeen();
    this.fetchNotification();
    
  },
  methods: {
    async fetchUser() {
      try {
        let res = await UserStore.dispatch("getMe");
        this.user = res.data;
      } catch (error) {
        Alert.window("error", "Unauthorized", "Please login before add adop.");
        console.error(error);
      }
    },
    async fetchNotification() {
      let header = Header.getHeaders();
      try {
        let res = await axios.get("/notification", header);
        console.log(res.data);
        this.notiList = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    
    async setNotiToSeen() {
      try {
        let header = Header.getHeaders();
        await axios.put("/notification/updateStatus",null, header);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
