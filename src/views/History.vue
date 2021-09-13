<template>
  <div class="main-container">
      <h1 class="title">History</h1>
      <div class="wrap-btn">
          <button class="disable">History</button>
          <button @click="toPaymentHistory">Payment History</button>
      </div>
      <HistoryBoard :data="data"/>
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

