<template>
  <div class="my-font-eng text-white">
    <div class="border-b border-solid border-white">
      <div class="ml-14 mt-10">
        <b><h1 class="text-4xl">Draw To Adop
          <span>
            <router-link to="/dta-sug">
              <button class="btn-sugges absolute">Suggestion</button>
            </router-link>
          </span>
        </h1></b>
      </div>

      <div class="mt-12 h-0">
        <coverflow :coverList="coverList" :coverWidth="230" :index="2" ></coverflow>
      </div>

      <div class="info -mt-20 py-16">
        <h2 class="py-3 text-3xl">Picture Name</h2>
        <h2 class="py-3 text-2xl">Name</h2>
        <h2 class="py-3 pb-12 text-2xl">Catagory:</h2>

        <div class="py-3 mb-3">
          <label  class="text-2xl">Requirement: Picture</label>
        </div>

        <!-- input image -->
        <input type="file" ref="file" style="display: none" @change="addImage"/>
        <div class="w-3/4 h-80 border-white border-2 relative bg-cover bg-center"
          @click="$refs.file.click()"
          @drop.prevent="addImage($event)"
          @dragover.prevent
          @mouseover="hoverImage = true"
          @mouseleave="hoverImage = false"
          :style="{ backgroundImage: 'url(' + `${dta_image}` + ')' }"
          tabindex="1"
        >
          <font-awesome-icon v-if="!dta_image" icon="camera" class="absolute w-full h-full flex justify-center items-center text-7xl text-white left-40"/>
          <div v-if="hoverImage" class="absolute w-full h-full flex justify-center items-center bg-black opacity-80 text-white text-xl">
            Upload Image
          </div>
        </div>

        <button class="btn-rounded absolute right-40 mt-6">Request</button>
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
  name: 'Dta',
    data () {
    return {
      hoverImage: false,
      dta_image: "",

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
  },
  methods: {
    addImage(e) {
      let files = null;
      if (e.type === "drop") {
        files = e.dataTransfer.files;
      }
      else if (e.type === "change") {
        files = e.target.files;
      }
      if (files) {
        this.dta_image = URL.createObjectURL(files[0]);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.info{
  margin-left: 65%;
}
</style>