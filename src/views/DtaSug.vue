<template>
    <div class="my-font-eng">
        <div class="ml-14 mt-10">
            <b><h1 class="text-4xl text-white">Draw To Adop |<span class="text-2xl"> Suggestion</span></h1></b>
        </div>

        <Loading v-if="loading"/>
        <div class="ml-14 mt-10" v-if="!loading">
            <vue-flex-waterfall :col="4" :col-spacing="20" :break-by-container="true">
                <div v-for="dta_list in dtaPost" :key="dta_list.index">
                    <img
                    :src="getImagePath(dta_list.path)"
                    height="200px"
                    width="350px"
                    class="transition duration-300 ease-in-out transform hover:scale-110"
                    @click="dta_sug(dta_list.user_id)"
                    />
                    <br>
                </div>
            </vue-flex-waterfall>
        </div>
    </div>

</template>

<script>
import VueFlexWaterfall from "vue-flex-waterfall";
import DtaStore from "../store/Dta.js";
import UserStore from "../store/User.js";
import TradeStore from "../store/Trade.js";
import Header from "@/helpers/Header";
import Alert from "../helpers/Alert";
import axios from "axios";
import Loading from "../components/Loading.vue";

export default {
    name: 'DtaSug',

    data() {
        return {
            loading: true,

            postId: "",
            postInfo: "",
            postAll: [],

            dtaPost: [],
            dta_images: [],

            user_me: {},
            status: "",
        };
    },

    components: {
        VueFlexWaterfall,
        Loading
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
                let res = await DtaStore.dispatch("getDta_image_list");
                this.dta_images = DtaStore.getters.dta_image_list;
                console.log(this.dta_images);
                console.log(this.postId);

                for(var i=0; i<this.dta_images.length; i++){
                    if(this.dta_images[i].trade_id == this.postId){
                        this.dtaPost.push(this.dta_images[i])
                    }
                }
                this.loading = false;
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

        async dta_sug(id){
            try {
                let headers = Header.getHeaders();
                await axios.put(`/adopt/transfer/${this.postInfo.adopt.id}/${id}`, {}, headers);
                await axios.put(`/trade/close_sale/${this.postInfo.id}`, {}, headers);
                await axios.put(`/adopt/unUse/${this.postInfo.adopt.id}`, {}, headers);
                let data = {
                    status: 'DTA',
                    trans_user: id,
                    adopt_id: this.postInfo.adopt.id
                };
                await axios.post(`/adop-histories`, data, headers);
                Alert.mixin("success", "Dta successfully");
                this.$router.push("/");
            } 
            catch (error) {
                if (error.response.status === 404) this.error = "Invalid dta suggestion";
                else this.error = error.response;
                Alert.mixin("error", `${this.error}. Please try again.`);
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>