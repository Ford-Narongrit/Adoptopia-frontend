<template>
    <div class="main-container">
        <h1 class="title">Payment History</h1>
        <div class="wrap-btn">
          <button @click="toHistory" >History</button>
          <button class="disable">Payment History</button>
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
    data(){
        return {
            data: [
                {
                    "date": "2021-02-01",
                    "name": "namenhai",
                    "type": "Deposit",
                    "amount": 5000
                },
                {
                    "date": "2021-02-02",
                    "name": "namenhaiaa",
                    "type": "Deposit",
                    "amount": 2000
                },
            ],
        }
    },
    methods: {
        toHistory() {
            this.$router.push("/history")
        }
    }
}
</script>

<style lang="scss" scoped>
.main-container {
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

