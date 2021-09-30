<template>
<div class="auction text-white">

  <div class="border-b border-solid border-white">
    <b><h1 class="text-4xl ml-14 mt-10">Auction</h1></b>

    <div class="mt-12 h-0">
      <coverflow :coverList="coverList" :coverWidth="230" :index="2" @change="handleChange"></coverflow>
    </div>
  
    <div class="info -mt-20 py-16">
        <h2 class="py-3 text-3xl">Picture Name</h2>
        <h2 class="py-3 pb-12 text-2xl">Name</h2>
        <p class="py-3 text-5xl">00 : 00 : 00</p>
        <p class="py-3 text-3xl">Current Price: 25 Coin</p>
        <p class="py-3 pb-12">Start Bid: 10 Coin | Auto Buy: 100 Coin | Bid: 1 Coin</p>
        <div class="py-3">
            <label  class="text-2xl" for="bit">Your Bit: </label>
            <input type="number" min="1" max="100" name="bit" placeholder="0" autocomplete="off" class="rounded text-black text-center text-2xl">
            <button class="btn-square absolute right-48" >Auction</button>
        </div>
        <div class="py-3">
            <label  class="text-2xl" for="bit">Auto Buy: 100 Coin</label>
            <button class="btn-rounded absolute right-48">Auto Buy</button>
        </div>
    </div>
  </div>
        
  <div class="text-2xl">
    <b><h1 class="text-4xl ml-14 mt-10 pb-12 pt-5">Agreement</h1></b>
    <div class="ml-32">
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
.auction{
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
}
.info{
  margin-left: 65%;
}

</style>