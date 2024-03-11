<template>
    <div class="app">
      <div class="background">
        <!-- 图片作为背景 -->
        <img src="../../assets/images/consult.jpg" alt="Background Image" />
      </div>
      <img src="../../assets/images/map.png" class = "direction" @click="showLocation()">
      
      <div v-if="showMap" >
        <img src="../../assets/images/consult2.jpg" class="mask-background">
        <div class="images-container">
          <img src="../../assets/images/map.png" style="width: 140%;" @click="showSuzhou" alt="Image" />
        </div>
     </div>
     <div class="text-box">
        <p>拿张地图看看吧。</p>
   <!-- <p>{{counterStore.info}}</p> -->
        <!-- <p>{{ counterStore.info }}</p> -->
      </div>
    </div>
  </template>
  
  <script setup>
//import LightSDK from "light-sdk"
import { useMainStore } from '../../store/index.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const counterStore = useMainStore();
const showMap = ref(false);

const showLocation = () => {
  showMap.value = true;
  const param = { name: "location", path: "/locationMap", meaning: "位置" };
  counterStore.addToMyArray(param);
  console.log(counterStore.params);
};

const showSuzhou = () => {
  router.push('/locationMap');
};

  </script>
  
  <style lang="less" scoped>
  .app {
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  
  .background img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 图片适应容器 */
  }
  .direction{
    position: absolute;
    bottom: 50%;
    left: 10%;
    width: 30%;
    opacity: 0;

  }
  @keyframes show-in {
    0% {
      opacity: 0; /* 开始时不可见 */
    }
    60% {
      opacity: 1; /* 逐渐可见 */
    }
    100% {
      opacity: 1; /* 逐渐可见 */
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
    text-align: center;
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
    font-size: 27px; /* 文字大小 */
    color: #000; /* 文字颜色 */
    /* 可以根据需要添加更多样式 */
  }

  .mask-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    object-fit: cover; /* 图片适应容器 */
    opacity: 1;
    z-index: 1;
  }
  
  .images-container {
    
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-70%,-60%); 
    opacity: 0; /* 默认透明 */
    z-index: 2;
    animation: show-in 1s ease forwards;
  }

  .image {
    width: auto;
    height: 10%;
  }
  </style>
  