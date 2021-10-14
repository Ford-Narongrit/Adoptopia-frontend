<template>
    <div class="my-font-eng">
        <div class="ml-14 mt-10">
            <b><h1 class="text-4xl text-white">Draw To Adop |<span class="text-2xl"> Suggestion</span></h1></b>
        </div>

        <div class="ml-14 mt-10">
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
import Header from "@/helpers/Header";
import Alert from "../helpers/Alert";
import axios from "axios";

export default {
    name: 'DtaSug',

    data() {
        return {
            postId: "",
            postInfo: "",

            dtaPost: [],
            dta_images: [],

            user_me: {},
            status: "",
        };
    },

    components: {
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
                let res = await DtaStore.dispatch("getDta_image_list");
                this.dta_images = DtaStore.getters.dta_image_list;
                console.log(this.dta_images);
                console.log(this.postId);

                for(var i=0; i<this.dta_images.length; i++){
                    if(this.dta_images[i].trade_id === this.postId){
                        this.dtaPost.push(this.dta_images[i])
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

        async dta_sug(id){
            let headers = Header.getHeaders();
            try {
                await axios.put(`/adopt/transfer/${this.postInfo.adopt.id}/${id}`, {}, headers);
                Alert.mixin("success", "Dta successfully");
            } 
            catch (error) {
                if (error.response.status === 404) this.error = "Invalid dta suggestion";
                else this.error = error.response.data;
                Alert.mixin("error", `${this.error}. Please try again.`);
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>