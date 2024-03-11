<template>
    <div class="app" @touchmove="handleTouchMove">
      <div class="background">
        <!-- 图片作为背景 -->
        <img src="../assets/images/station.jpg" alt="Background Image" />
      </div>
      <div class="text-box">
        <p>欢迎来到苏州！</p>
      </div>
      <img
      src="../assets/images/down.png"
      class="jumping-image"
      alt="Jumping" @click="handleTouchMove"
    />
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const handleTouchMove = () => {
  router.push('/locationConsult'); // 导航到名为 "other-page" 的页面
}    

</script>
  
<style lang="less" scoped>
  .app {
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .jumping-image {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 10%;
  opacity: 0.5;
  margin: 0 auto; /* 水平居中 */
  animation: jump 1s ease infinite; /* 跳跃动画，无限循环 */
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
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .background img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 图片适应容器 */
  }
  .direction{
    position: absolute;
    bottom: 20%;
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
      opacity: 0.8; /* 逐渐可见 */
    }
  }
  .text-box {
    position: absolute;
    bottom: 75%;
    width: 80%;
    left: 50%;
    transform: translateX(-50%); 
    padding: 20px; /* 文本框内边距 */
    text-align: center;
    line-height: normal;
  }
  @keyframes slide-in {
    0% {
    
      bottom: -30%;
      opacity: 1; /* 开始时不可见 */
    }
    
    100% {
      bottom: 20%; /* 结束时在垂直中间 */
      opacity: 1; /* 逐渐可见 */
    }
  }
  .text-box p {
    font-size: 30px; /* 文字大小 */
    color: #000; /* 文字颜色 */
    /* 可以根据需要添加更多样式 */
  }
  </style>
  