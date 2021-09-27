<template>
    <div class="ota text-white">
        <div class="ota1">
            <b><h1 class="text-4xl ml-14 mt-10">Offer To Adop</h1></b>

            <div class="info py-16">
                <h2 class="py-3 text-3xl">Picture Name</h2>
                <h2 class="py-3 pb-12 text-2xl">Name</h2>
                <div class="py-3">
                    <label  class="text-2xl" for="offer">Offer: </label>
                    <input type="text" name="offer" placeholder="Enter your offer" autocomplete="off" class="rounded text-black text-center text-2xl w-56">
                    <button class="btn text-1xl absolute">Attach</button>
                </div>
                <button class="btn text-1xl mt-12">Request</button>
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

<script>
export default {
  name: 'Ota'
}
</script>

<style lang="scss" scoped>
.ota{
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
}
.ota1{
    border-bottom: 1px solid;
    border-color: #ffffff;
}
.info{
    margin-left: 50%;
    margin-top: -3em;
}
.btn{
    background: #1E63E9;
    border-radius: 20px;
    flex: none;
    width: 6em;
    height: 2.2em;
    right: 24em;  
}
.btn:hover{
    color: #1E63E9;
    background: #ffffff;
}
</style>