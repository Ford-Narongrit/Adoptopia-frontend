<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="(heading, index) in key" :key="index">{{ heading }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in data" :key="index">
                    <td v-for="(heading, index) in key" :key="index">{{data[heading]}}</td>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>

<script>
export default {
    props: {
        data: Array
    },
    data() {
        return {
            key: Object.keys(this.data[0]),
        }
    },
    created(){
        console.log(this.data);
        console.log(this.key);
    },
    methods: {
        
    }

}
</script>

<style lang="scss" scoped>
$bg-clr: #E5E5E5;

table {
    margin: 1em auto;
    background-color: $bg-clr;
    width: 600px;
    height: 400px;
}
</style>>

