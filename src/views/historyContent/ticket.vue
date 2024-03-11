
<template>
  
  <div class="app"> -->
  <div class="background"></div>
  <img src="../../assets/images/door.jpg"  class = "back-door" alt="pass">
  <img src="../../assets/images/pass_people.png"  class = "back-people" alt="passPeople">
  <img src="../../assets/images/people.png" class="overlay" alt="Overlay Image" />
  <img src="../../assets/images/ticket.png" class="overlay-ticket"/>
  <img
    src="../../assets/images/hand.png"
    class="jumping-image"
    alt="Jumping" v-if="!showTicket"
  />
  <div class="rectangle" @click="rectangleClicked"></div>
  <div v-if="showTicket">
  <div class="mask-background"></div>
    <div class="images-container">
      <img class="image" :src="image1" alt="Image 1" />
      <img class="image" :src="image2" alt="Image 2" :style="image2Style" 
      @touchstart="startSwipe"
      @touchmove="swipeImage"
      @touchend="endSwipe"
      @click="endSwipe"/>
      
      <p v-if="showSuccessText" class="success-text">检票成功</p>
    </div>
  <div class = "line-dot" v-if="!showSuccessText">
    <p class="line-text">向右滑动检票</p>
    <hr class="dashed-line">
    <div class="dot"></div>
  </div>
</div>

  </div>
</template>

<script setup>
//import LightSDK from "light-sdk"
import { useMainStore } from '../../store/index.js'
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const counterStore = useMainStore();
const image1 = "../src/assets/images/ticket1.jpg";
    const image2 = "../src/assets/images/ticket2.jpg";
    const isSwiping = ref(false);
    const startSwipeX = ref(0);
    const image2X = ref(0);
    const image2Rotation = ref(0);
    const showSuccessText = ref(false); // 控制检票成功文字的显示
    const showTicket = ref(false);

    const image2Style = computed(() => {
      return {
        transform: `translateX(${image2X.value}px) rotate(${image2Rotation.value}deg)`,
      };
    });
    const startSwipe = (event) => {
      isSwiping.value = true;
      startSwipeX.value = event.touches[0].clientX;
    };

    const swipeImage = (event) => {
      if (isSwiping.value) {
        const deltaX = event.touches[0].clientX - startSwipeX.value;
        image2X.value += deltaX;
        startSwipeX.value = event.touches[0].clientX;

        // Add a slight clockwise rotation
        image2Rotation.value += 1;
      }
    };

    const endSwipe = () => {
      isSwiping.value = false;
      // 手指抬起后显示"检票成功"文字
      showSuccessText.value = true;
    };

    const rectangleClicked = () => {
      showTicket.value = !showTicket.value;
      let param = { name: "history", path: "/historyMap", meaning: "历史" };
      counterStore.addToMyArray(param);
      //LightSDK.native.writeData(params);

    };

    const navigateToAnotherPage = () => {
      router.push('/historyMap');
    };

    watch(showSuccessText, (newVal) => {
      if (newVal) {
        setTimeout(() => {
          navigateToAnotherPage(); // 在1秒后跳转到另一个页面
        }, 1500); // 1000毫秒 = 1秒
      }
    });
</script>

<style lang="less" scoped>

.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.back-door {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
}
.back-people {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 2;
}
.overlay {
position: absolute;
left:-100%; /* 开始时在底部之外 */
  bottom: 0;
  width: 100%;
z-index: 1; /* 确保在背景图片之上 */
animation: slide-in 2s ease forwards; /* 应用关键帧动画 */
}

@keyframes slide-in {
0% {
  left:-100%; /* 开始时在底部之外 */
  bottom: 0;
  opacity: 1; /* 开始时不可见 */
}

100% {
  bottom: 0; /* 结束时在垂直中间 */
  left: 0; /* 结束时在水平中间 */
  opacity: 1; /* 逐渐可见 */
}
}
.overlay-ticket {
position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
z-index: 3; /* 确保在背景图片之上 */
animation: show-in 3s ease forwards; /* 应用关键帧动画 */
}

@keyframes show-in {
0% {
  opacity: 0; /* 开始时不可见 */
}
60% {
  opacity: 0;
}
100% {
  opacity: 1; /* 逐渐可见 */
}
}
.jumping-image {
position: absolute;
bottom: 35%;
left: 60%;
width: 6%;
opacity: 1;
animation: show-in 3s ease forwards,jump 1s ease infinite; /* 跳跃动画，无限循环 */
}

@keyframes jump {
0%, 20%, 50%, 80%, 100% {
  transform: translateY(0);
}
40% {
  transform: translateY(-10px);
}
60% {
  transform: translateY(-5px);
}
}
.rectangle {
position: absolute;
bottom: 28%;
left: 58%;
width: 12%;
height: 6%;
background-color: #ffffff00; /* 背景颜色 */
cursor: pointer; /* 鼠标悬停时显示手型光标 */
z-index: 3;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
}
.mask-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #131313;
  opacity: 0.5;
  z-index: 4;
}

.images-container {
  
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  justify-content: center; /* 水平居中 */
  align-items: center;
  touch-action: pan-y; /* 让垂直滑动正常工作 */
  z-index: 5;
}

.image {
  
  width: auto;
  height: 18%;
  
}


.line-dot{
  position: absolute;
right: 8.6%;
top: 38%;
width: 16%;
z-index: 5;

}
.line-text{
  color: #ffffff;
  font-size: 20px;
}
.dashed-line {
  position: relative;
  top: 13px;
width: 100%;
border: none;
border-top: 3px dashed #ffffff; /* 虚线样式 */
}
.dot {
width: 10px; /* 圆点的宽度 */
height: 10px; /* 圆点的高度 */
background-color: #ffffff; /* 圆点的颜色 */
border-radius: 50%; /* 使元素成为圆点 */
z-index: 1;
position: relative;
animation: moveRight 2s linear infinite; /* 使用动画实现循环向右移动 */
}

@keyframes moveRight {
0% {
  left: 0%; /* 初始位置 */
}
100% {
  left: 100%; /* 结束位置，这将使圆点移到最右边 */
}
}
.success-text {
text-align: center;
color: rgb(255, 255, 255);
font-size: 30px;
position: absolute;
bottom: 35%;
left: 0; /* 水平居中 */
right: 0; /* 水平居中 */
z-index: 5;
}
</style>
