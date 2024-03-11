<template>
    <div class="app">
        <div class = "back">
        <img src = "../../assets/images/back.png" @click="backTo">
        </div>
      <div class="background">
        <!-- 图片作为背景 -->
        <img src="../../assets/images/table_food.jpg" alt="Background Image" />
      </div>
      <div class="text-box">
        <p>请享用吧！</p>
      </div>
    </div>  
    
  </template>
  
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();

// After the component is created, wait for 5 seconds and then navigate to '/cultureMap'
setTimeout(() => {
    router.push('/cultureMap');
}, 5000);

const backTo = () => {
    router.push('/cultureMap');
};
</script>
  
  <style lang="less" scoped>
  .app {
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .back {
  position: absolute;
  top: 6%;
  right: 1.5%;
  /* Add any other styles you need */
  z-index: 1;
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
    left: 48%;
    width: 30%;
    opacity: 0.7;
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
    font-size: 30px; /* 文字大小 */
    color: #000; /* 文字颜色 */
    /* 可以根据需要添加更多样式 */
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
bottom: 30%;
left: 45%;
width: 25%;
height: 5%;
background-color: #ffffff00; /* 背景颜色 */
cursor: pointer; /* 鼠标悬停时显示手型光标 */
z-index: 3;
}
  </style>
  