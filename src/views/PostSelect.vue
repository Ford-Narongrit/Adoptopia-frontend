<template>
  <div class="my-font-eng text-white">
    <div class="ml-14 mt-10">
        <b><h1 class="text-4xl text-white">Post |<span class="text-2xl"> Please select adop to post</span></h1></b>
    </div>

    <!-- adop -->
    <div class="grid grid-cols-4 gap-3 ml-5 mt-10">
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
import VueFlexWaterfall from "vue-flex-waterfall";
import SelectAdop from "@/components/SelectAdop.vue";
import Alert from "../helpers/Alert";
import UserStore from "../store/User";

export default {
    data() {
        return {
            adopts: [],
            showAdopt:[]
        };
    },

    components: {
        SelectAdop,
        VueFlexWaterfall,
    },

    mounted() {
        this.fetch();
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
            } catch (error) {
                console.error(error.response);
            }
        },
        async selectAdopt(id) {
            try {
                let res = await UserStore.dispatch("getMe");
                this.user = res.data;
                this.$router.push({path:"post",name:"PostAdopt", params:{adop_id:id}})

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