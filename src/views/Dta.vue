<template>
    <div class="dta text-white">
        <div class="dta1">
            <b><h1 class="text-4xl ml-14 mt-10">Draw To Adop</h1></b>

            <div class="info py-16">
                <h2 class="py-3 text-3xl">Picture Name</h2>
                <h2 class="py-3 pb-12 text-2xl">Name</h2>
                <div class="py-3">
                    <label  class="text-2xl" for="bit">Requirement: Picture</label>
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
  name: 'Dta'
}
</script>

<style lang="scss" scoped>
.dta{
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
}
.dta1{
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