<template>
    <div class="app">
      <div class="background">
        <!-- 图片作为背景 -->
        <img src="../assets/images/come.jpg" alt="Background Image" />
      </div>
      <img src="../assets/images/gohead.png" class = "direction" @click="goToHistory">
      <div class="text-box">
        <p>苏州，地处长江流域，濒临太湖。水资源自古以来对苏州的发展起着重要作用，去博物馆了解一下苏州历史吧！</p>
        <p style="color: brown;">(地图放在背包里了，可随时查看)</p>
      </div>
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToHistory = () => {
  router.push('/historyTicket');
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
    opacity: 0.8;
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
      opacity: 0.7; /* 逐渐可见 */
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
  