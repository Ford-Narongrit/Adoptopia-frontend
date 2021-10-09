<template>
<div class="my-font-eng text-white">

  <div class="border-b border-solid border-white">
    <b><h1 class="text-4xl ml-14 mt-10">Auction</h1></b>

    <div class="mt-12 h-0">
      <coverflow :coverList="coverList" :coverWidth="230" :index="2" @change="handleChange"></coverflow>
    </div>
  
    <div class="info -mt-20 py-16">
        <h2 class="py-3 text-3xl">Picture Name</h2>
        <h2 class="py-3 text-2xl">Name</h2>
        <h2 class="py-3 pb-12 text-2xl">Catagory:</h2>
        
        <div class="py-3">
            <label  class="text-2xl">Your Bit: </label>
            <input type="number" min="1" max="100" name="bit" placeholder="0" autocomplete="off" class="rounded text-black text-center text-2xl">
            <button class="btn-rounded absolute right-48" >Auction</button>
        </div>
        <div class="pt-3">
            <label  class="text-2xl">Auto Buy: 100 Coin</label>
            <button class="btn-rounded absolute right-48">Auto Buy</button>
        </div>
    </div>

    <div class="px-3 text-center -mt-12">
      <p class="py-3 text-5xl">00 : 00 : 00</p>
      <p class="py-3 text-3xl">Current Price: 25 Coin</p>
      <p class="py-3 pb-12">Start Bid: 10 Coin | Auto Buy: 100 Coin | Bid: 1 Coin</p>
    </div>

    <!-- <div>
      <br><br>
      <p class="py-3 text-5xl ml-14">00 : 00 : 00</p>

      <p class="py-3 text-3xl ml-14">Current Price: 25 Coin
      <span class="py-3">
        <label  class="info1 py-3 text-2xl" style="margin-left:30%;">Your Bit: </label>
        <input  class="rounded text-black text-center text-2xl" type="number" min="1" max="100" name="bit" placeholder="0" autocomplete="off">
        <button class="btn-square absolute right-48" >Auction</button>
      </span></p>

      <p class="py-3 pb-12 ml-14">Start Bid: 10 Coin | Auto Buy: 100 Coin | Bid: 1 Coin
      <span class="py-3" style="margin-left:26%;">
        <label  class="info1 text-2xl">Auto Buy: 100 Coin</label>
        <button class="btn-rounded absolute right-48">Auto Buy</button>
      </span></p>
    </div> -->
  </div>
        
  <div class="text-2xl">
    <b><h1 class="text-4xl ml-14 mt-10 pb-12 pt-5">Agreement</h1></b>
    <div class="my-font-th ml-32">
        <p class="py-3">1. ไม่ขายต่อในราคาที่สูงกว่า(ยกเว้นกรณีมีรูปจากคอมมิชชัน)</p>
        <p class="py-3">2. ไม่แอบอ้างว่าเป็นผู้ออกแบบเอง</p>
        <p class="py-3">3. เมื่อนำภาพไปใช้ จะต้องใส่เครดิตทุกครั้ง</p>
        <p class="py-3">4. ไม่อนุญาติให้นำไปเเจก</p>
        <p class="py-3 pb-16">5. ดัดเเปลงได้เเต่ต้องยังเหลือเค้าโครงเดิม</p>
    </div>     
  </div>

</div>
</template>

<script src="https://unpkg.com/@diracleo/vue-enlargeable-image/dist/vue-enlargeable-image.min.js"></script>
<script>
import coverflow from 'vue-coverflow'

export default {
  name: 'Auction',
  data () {
    return {

      coverList: [
        {
          cover: require('../assets/1.jpg'),
        }, {
          cover: require('../assets/2.jpg'),
        }, {
          cover: require('../assets/3.jpg'),
        }, {
          cover: require('../assets/4.jpg'),
        }, {
          cover: require('../assets/5.jpg'),
        },
      ],

    }
  },
  components: {
    coverflow
  }
}
</script>

<style lang="scss" scoped>
.info{
  margin-left: 65%;
}
// .info1{
//   margin-left: 22%;
// }
</style>