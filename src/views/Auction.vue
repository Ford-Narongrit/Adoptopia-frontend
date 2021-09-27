<template>
    <div class="auction text-white">
        <div class="auction1">
            <b><h1 class="text-4xl ml-14 mt-10">Auction</h1></b>

            <div class="img ml-14 mt-10 h-0">
                <!--image slider start-->
                <div class="slider">
                    <div class="slides">
                        <!--radio buttons start-->
                        <input type="radio" name="radio-btn" id="radio1">
                        <input type="radio" name="radio-btn" id="radio2">
                        <input type="radio" name="radio-btn" id="radio3">
                        <input type="radio" name="radio-btn" id="radio4">
                        <!--radio buttons end-->
                        <!--slide images start-->
                        <div class="slide first">
                            <img src="../assets/1.jpg" alt="">
                        </div>
                        <div class="slide">
                            <img src="../assets/2.jpg" alt="">
                        </div>
                        <div class="slide">
                            <img src="../assets/3.jpg" alt="">
                        </div>
                        <div class="slide">
                            <img src="../assets/4.jpg" alt="">
                        </div>
                        <!--slide images end-->
                        <!--automatic navigation start-->
                        <div class="navigation-auto">
                            <div class="auto-btn1"></div>
                            <div class="auto-btn2"></div>
                            <div class="auto-btn3"></div>
                            <div class="auto-btn4"></div>
                        </div>
                        <!--automatic navigation end-->
                    </div>
                    <!--manual navigation start-->
                    <div class="navigation-manual">
                        <label for="radio1" class="manual-btn"></label>
                        <label for="radio2" class="manual-btn"></label>
                        <label for="radio3" class="manual-btn"></label>
                        <label for="radio4" class="manual-btn"></label>
                    </div>
                    <!--manual navigation end-->
                </div>
                <!--image slider end-->
            </div>

            <div class="info py-16">
                <h2 class="py-3 text-3xl">Picture Name</h2>
                <h2 class="py-3 pb-12 text-2xl">Name</h2>
                <p class="py-3 text-5xl">00 : 00 : 00</p>
                <p class="py-3 text-3xl">Current Price: 25 Coin</p>
                <p class="py-3 pb-12">Start Bid: 10 Coin | Auto Buy: 100 Coin | Bid: 1 Coin</p>
                <div class="py-3">
                    <label  class="text-2xl" for="bit">Your Bit: </label>
                    <input type="number" min="1" max="100" name="bit" placeholder="0" autocomplete="off" class="rounded text-black text-center text-2xl">
                    <button class="btn text-1xl absolute" >Auction</button>
                </div>
                <div class="py-3">
                    <label  class="text-2xl" for="bit">Auto Buy: 100 Coin</label>
                    <button class="btn text-1xl absolute">Auto Buy</button>
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

<script>
export default {
  name: 'Auction'
}
</script>

<style lang="scss" scoped>
.auction{
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
}
.auction1{
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

.slider{
  width: 500px;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
}

.slides{
  width: 500%;
  height: 500px;
  display: flex;
}

.slides input{
  display: none;
}

.slide{
  width: 20%;
  transition: 2s;
}

.slide img{
  width: 500px;
  height: 500px;
}

/*css for manual slide navigation*/

.navigation-manual{
  position: absolute;
  width: 500px;
  margin-top: -40px;
  display: flex;
  justify-content: center;
}

.manual-btn{
  border: 2px solid #40D3DC;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: 1s;
}

.manual-btn:not(:last-child){
  margin-right: 40px;
}

.manual-btn:hover{
  background: #40D3DC;
}

#radio1:checked ~ .first{
  margin-left: 0;
}

#radio2:checked ~ .first{
  margin-left: -20%;
}

#radio3:checked ~ .first{
  margin-left: -40%;
}

#radio4:checked ~ .first{
  margin-left: -60%;
}

/*css for automatic navigation*/

.navigation-auto{
  position: absolute;
  display: flex;
  width: 500px;
  justify-content: center;
  margin-top: 460px;
}

.navigation-auto div{
  border: 2px solid #40D3DC;
  padding: 5px;
  border-radius: 10px;
  transition: 1s;
}

.navigation-auto div:not(:last-child){
  margin-right: 40px;
}

#radio1:checked ~ .navigation-auto .auto-btn1{
  background: #40D3DC;
}

#radio2:checked ~ .navigation-auto .auto-btn2{
  background: #40D3DC;
}

#radio3:checked ~ .navigation-auto .auto-btn3{
  background: #40D3DC;
}

#radio4:checked ~ .navigation-auto .auto-btn4{
  background: #40D3DC;
}
</style>