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
            this.postInfo = this.$route.params.postInfo;
            this.postId = this.$route.params.id
        }
        this.fetch();
        this.fetchMe();
    },

    methods: {
        async fetch() {
            try {
                let res = await OtaStore.dispatch("getOta_Adops_list");
                this.adopts = OtaStore.getters.ota_adops_list;
                console.log(this.adopts);
                console.log(this.postId);

                for(var i=0; i<this.adopts.length; i++){
                    if(this.adopts[i].trade_id === this.postId){
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
                // console.log(this.user_me);
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
                Alert.mixin("success", "Ota successfully");
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