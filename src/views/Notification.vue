<template>
  <div class="grid grid-cols-1">
    <h1 class="flex justify-center text-7xl my-8 text-white">Notification</h1>
    <div class="justify-self-center bg-white h-screen w-3/5 ">
      <div v-for="(noti, index) in notiList" :key="index">
        <notification-card 
        :name="user.name" 
        :text="noti.text"
        :profile="user.profile"
        :time="noti.created_at"/>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NotificationCard from "../components/NotificationCard.vue";

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
    axios.get("user/" + "6").then((response) => {
      this.user = response.data;
    });
    axios.get("/user/notification/" + "6").then((response) => {
      this.notiList = response.data;
    });
  },
};
</script>

<style></style>
