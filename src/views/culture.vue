<template>
  <div class="app">
    <div class="background">
      <!-- 图片作为背景 -->
      <img src="../assets/images/out.jpg" alt="Background Image" />
    </div>
    <img src="../assets/images/gohead2.png" class = "direction" @click="goToCulture">
    <div class="text-box">
      <p>苏州悠久的历史为这座城市注入了丰富的文化底蕴，去体验一下苏州的文化活动吧！</p>
      <p style="color: brown;">(门票放在背包里了，可随时参观)</p>
    </div>
  </div>
</template>

<script setup>
//import LightSDK from "light-sdk"
import { useMainStore } from '../store/index.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const counterStore = useMainStore();

const goToCulture = () => {
  const param = {name: "culture", path: "/cultureMap", meaning: "文化"}
  counterStore.addToMyArray(param);
  console.log(counterStore.params)
  router.push('/cultureMap');
}
  
  
</script>

<style lang="less" scoped>
.app {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 图片适应容器 */
}
.direction{
  position: absolute;
  bottom: 25%;
  left: 40%;
  width: 30%;
  opacity: 0.6;
  animation: show-in 3s ease forwards;
}
@keyframes show-in {
  0% {
    opacity: 0; /* 开始时不可见 */
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 0.6; /* 逐渐可见 */
  }
}
.text-box {
  position: absolute;
  bottom: 10%;
  width: 80%;
  left: 50%;
  transform: translateX(-50%); 
  background: rgba(255, 255, 255, 0.4); /* 白色背景，透明度为0.5 */
  padding: 20px; /* 文本框内边距 */
  
  line-height: normal;
  animation: slide-in 2s ease forwards; 
}
@keyframes slide-in {
  0% {
  
    bottom: -30%;
    opacity: 1; /* 开始时不可见 */
  }
  
  100% {
    bottom: 10%; /* 结束时在垂直中间 */
    opacity: 1; /* 逐渐可见 */
  }
}
.text-box p {
  font-size: 30px; /* 文字大小 */
  color: #000; /* 文字颜色 */
  /* 可以根据需要添加更多样式 */
}
</style>
