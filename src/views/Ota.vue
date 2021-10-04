<template>
  <div class="my-font-eng ota text-white">
    <div class="border-b border-solid border-white">
      <div class="ml-14 mt-10">
        <b><h1 class="text-4xl">Offer To Adop
          <span>
            <router-link to="/ota-sug">
              <button class="btn-sugges absolute">Suggestion</button>
            </router-link>
          </span>
        </h1></b>
      </div>

      <div class="mt-12 h-0">
          <coverflow :coverList="coverList" :coverWidth="230" :index="2" @change="handleChange"></coverflow>
      </div>

      <div class="info -mt-20 py-16">
        <h2 class="py-3 text-3xl">Picture Name</h2>
        <h2 class="py-3 text-2xl">Name</h2>
        <h2 class="py-3 pb-12 text-2xl">Catagory:</h2>

        <div class="py-3">
            <label  class="text-2xl" for="offer">Offer: </label>
            <input  class="rounded text-black text-center text-1xl w-40" type="text" name="offer" placeholder="Enter your offer" autocomplete="off">
            <button class="btn-rounded absolute right-48">Attach</button>
        </div>

        <button class="mt-12 btn-rounded absolute">Request</button>
      </div>

      <br><br>   
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
  name: 'Ota',
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
</style>