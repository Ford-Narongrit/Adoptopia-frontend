<template>
  <div class="text-center my-font-eng">
      <h1 class="my-text-title text-white my-8">History</h1>
      <div class="flex justify-around mt-8 w-1/3 mx-auto">
          <button class="w-52 px-4 py-2 rounded-full my-text-content text-white border-2 border-white bg-blue-700 cursor-default">History</button>
          <button @click="toPaymentHistory" class="w-52 px-4 py-2 rounded-full my-text-content text-white border-2 border-white hover:bg-blue-700">Payment History</button>
      </div>
      <HistoryBoard :data="data" class="mt-8"/>
  </div>
</template>

<script>
import HistoryBoard from '@/components/HistoryBoard'
export default {
    components: {
        HistoryBoard,
    },
    data() {
        return {
            data:[
                    {
                        date: "2021-01-01",
                        name: "name1",
                        type: "type1",
                        item: "item1",
                        user: "user1"
                    },
                    {
                        date: "2021-01-02",
                        name: "name2",
                        type: "type2",
                        item: "item2",
                        user: "user2"
                    },
                    {
                        date: "2021-01-02",
                        name: "name2",
                        type: "type2",
                        item: "item2",
                        user: "user2"
                    },
                    {
                        date: "2021-01-02",
                        name: "name2",
                        type: "type2",
                        item: "item2",
                        user: "user2"
                    },
                    {
                        date: "2021-01-02",
                        name: "name2",
                        type: "type2",
                        item: "item2",
                        user: "user2"
                    },
                    {
                        date: "2021-01-02",
                        name: "name2",
                        type: "type2",
                        item: "item2",
                        user: "user2"
                    },
                ],
        };
    },
    created() {
        console.log(this.data);
    },
    methods: {
        toPaymentHistory() {
            this.$router.push("/payment/history")
        }
    }
    
}

</script>

<style lang="scss" scoped>

.main-container{
    text-align: center;
    .title {
        font-size: 2em;
        margin-top: 1em;
    }

    .wrap-btn {
        display: flex;
        width: 500px;
        margin: 1em auto;
        justify-content: space-evenly;

        button {
            width: 140px;
            height: 40px;
            color: white;
            background-color: #1E63E9;
            border-radius: 30px;
        }
        .disable {
            background-color: #E5E5E5;
            color: black;
            cursor:default;
        }
        
    }

}
    
</style>>

