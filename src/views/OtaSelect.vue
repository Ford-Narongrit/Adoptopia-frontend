<template>
  <div class="my-font-eng text-white">
    <div class="ml-14 mt-10">
        <b><h1 class="text-4xl text-white">Offer To Adop |<span class="text-2xl"> Please select adop to offer</span></h1></b>
    </div>

    <Loading v-if="loading"/>
    <!-- adop -->
    <div class="grid grid-cols-4 gap-3 ml-14 mt-10" v-if="!loading">
      <vue-flex-waterfall :col="4" :col-spacing="15" :break-by-container="true">
        <div
          v-for="adopt in showAdopt"
          :key="adopt.id"
          class="my-2 relative border-4 border-shark-400 rounded-lg bg-black"
          @click="selectAdopt(adopt.id)"
        >
          <select-adop :adopt="adopt" />
        </div>
      </vue-flex-waterfall>
    </div>
  </div>
</template>

<script>
import AdoptStore from "@/store/Adopt";
import TradeStore from "../store/Trade.js";
import Header from "@/helpers/Header";
import axios from "axios";
import VueFlexWaterfall from "vue-flex-waterfall";
import SelectAdop from "@/components/SelectAdop.vue";
import Alert from "../helpers/Alert";
import UserStore from "../store/User";
import Loading from "../components/Loading.vue";

export default {
    data() {
        return {
            loading: true,

            postId: "",
            postInfo: "",
            postAll: [],

            adopts: [],
            postInfo: "",
            showAdopt: []
        };
    },

    components: {
        SelectAdop,
        VueFlexWaterfall,
        Loading
    },

    created() {
        if(this.$route.params !== null){
            this.postId = this.$route.params.id
        }
    },

    mounted() {
        this.fetch();
        this.fetchTrade();
    },

    methods: {
        async fetch() {
            try {
                let res = await AdoptStore.dispatch("getAdopts_list");
                this.adopts = AdoptStore.getters.adopts_list;

                for(var i=0; i<this.adopts.length; i++){
                    if(this.adopts[i].status == 0){
                        this.showAdopt.push(this.adopts[i]);
                    }
                }
                this.loading = false;
            } catch (error) {
                console.error(error.response);
            }
        },
        async fetchTrade() {
            try {
                let res = await TradeStore.dispatch("getPost_Adops_list");
                this.postAll = TradeStore.getters.post_adops_list;

                for(var i=0; i<this.postAll.length; i++){
                    if(this.postAll[i].id == this.postId){
                        this.postInfo = this.postAll[i]
                    }
                }
            } catch (error) {
                console.error(error.response);
            }
        },

        async selectAdopt(adop_id) {
            try {
                let res = await UserStore.dispatch("getMe");
                this.user = res.data;
                this.$router.push({path:"/ota/" + this.postId, name:"ota", params:{adop_id:adop_id, postInfo: this.postInfo, id: this.postId}})
            } catch (error) {
                Alert.window("error", "Unauthorized", "Please login before select adopt.");
                console.error(error);
            }
        },
    },
}
</script>

<style>

</style>