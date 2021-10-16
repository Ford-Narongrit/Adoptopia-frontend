<template>
    <div class="my-font-eng">
        <div class="ml-14 mt-10">
            <b><h1 class="text-4xl text-white">Offer To Adop |<span class="text-2xl"> Suggestion</span></h1></b>
        </div>

    <div class="ml-14 mt-10">
        <vue-flex-waterfall :col="4" :col-spacing="20" :break-by-container="true">
        <div v-for="adopt_list in adopPost" :key="adopt_list.index">
            <img
            :src="getImagePath(adopt_list.adopt.adopt_image[0].path)"
            height="200px"
            width="350px"
            class="transition duration-300 ease-in-out transform hover:scale-110"
            @click="ota_sug(adopt_list.user_id, adopt_list.adopt_id)"
            />
            <br>
        </div>
      </vue-flex-waterfall>
    </div>

    </div>

</template>

<script>
import AdoptStore from "@/store/Adopt";
import Alert from "../helpers/Alert";
import UserStore from "../store/User";
import TradeStore from "../store/Trade.js";
import Header from "@/helpers/Header";
import axios from "axios";
import VueFlexWaterfall from "vue-flex-waterfall";
import SelectAdop from "@/components/SelectAdop.vue";
import OtaStore from "../store/Ota.js";

export default {
    name: 'OtaSug',

    data() {
        return {
            postId: "",
            postInfo: "",
            postAll: [],

            adopPost: [],
            adopts: [],

            user_me: {},
            status: "",
        };
    },

    components: {
        SelectAdop,
        VueFlexWaterfall,
    },

    created() {
        if(this.$route.params !== null){
            this.postId = this.$route.params.id
        }
    },
    
    mounted(){
        this.fetch();
        this.fetchTrade();
        this.fetchMe();
    },

    methods: {
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

        async fetch() {
            try {
                let res = await OtaStore.dispatch("getOta_Adops_list");
                this.adopts = OtaStore.getters.ota_adops_list;
                console.log(this.adopts);
                console.log(this.postId);

                for(var i=0; i<this.adopts.length; i++){
                    if(this.adopts[i].trade_id == this.postId){
                        this.adopPost.push(this.adopts[i])
                    }
                }
            } catch (error) {
                console.error(error.response);
            }
        },

        async fetchMe() {
            try {
                let res = await UserStore.dispatch("getMe");
                this.user_me = res.data;
            } catch (error) {
                console.error(error.response);
            }
        },
        
        getImagePath(image) {
            return process.env.VUE_APP_APIURL + image;
        },

        async ota_sug(id, adop){
            let headers = Header.getHeaders();
            try {
                await axios.put(`/adopt/transfer/${this.postInfo.adopt.id}/${id}`, {}, headers);
                await axios.put(`/adopt/transfer/${adop}/${this.user_me.id}`, {}, headers);
                await axios.put(`/trade/close_sale/${this.postInfo.id}`, {}, headers);
                await axios.put(`/adopt/unUse/${this.postInfo.adopt.id}`, {}, headers);
                await axios.put(`/adopt/unUse/${adop}`, {}, headers);
                
                let data = {
                    status: 'OTA',
                    trans_user: id,
                    adopt_id: this.postInfo.adopt.id,
                    trans_adopt: adop
                };
                await axios.post(`/adop-histories`, data, headers);
                Alert.mixin("success", "Ota successfully");
                this.$router.push("/");
            } 
            catch (error) {
                if (error.response.status === 404) this.error = "Invalid ota suggestion";
                else this.error = error.response.data;
                Alert.mixin("error", `${this.error}. Please try again.`);
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>