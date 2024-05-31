<template>
    <div class="app">
        <div class = "back">
        <img src = "../../assets/images/back.png" @click="backTo">
        </div>
      <div class="background">
        <!-- 图片作为背景 -->
        <img src="../../assets/images/menu_blank.jpg" alt="Background Image" />
      </div>
    <div class = "food">
      <!-- 添加小标题和菱形 -->
    <div class="title">
        <div class="diamond"></div>
      <h3>四时鲜蔬</h3>    
    </div>
    <!-- 添加内容列表 -->
    <div class="content">
    <table>
        <tr v-for="(row, rowIndex) in Math.ceil(vegetables.length / 3)" :key="rowIndex">
            <td v-for="(vegetable, colIndex) in 3" :key="colIndex">
            <div class="item">
            <p>{{ vegetables[rowIndex * 3 + colIndex].name }}</p>
            <input type="checkbox" v-model="vegetables[rowIndex * 3 + colIndex].checked" />
          </div>
        </td>
        
      </tr>
    </table>
  </div>   
    <div class="title">
        <div class="diamond"></div>
      <h3>风味河鲜</h3>    
    </div>
    <!-- 添加内容列表 -->
    <div class="content">
    <table>
        <tr v-for="(row, rowIndex) in Math.ceil(fishes.length / 3)" :key="rowIndex">
            <td v-for="(fish, colIndex) in 3" :key="colIndex">
            <div class="item">
            <p>{{ fishes[rowIndex * 3 + colIndex].name }}</p>
            <input type="checkbox" v-model="fishes[rowIndex * 3 + colIndex].checked"  />
          </div>
        </td>
        
      </tr>
    </table>
  </div> 
  <div class="title">
        <div class="diamond"></div>
      <h3>其他</h3>    
    </div>
    <!-- 添加内容列表 -->
    <div class="content">
    <table>
        <tr v-for="(row, rowIndex) in Math.ceil(others.length / 3)" :key="rowIndex">
            <td v-for="(other, colIndex) in 1" :key="colIndex">
            <div class="item">
            <p>{{ others[rowIndex * 3 + colIndex].name }}</p>
            <input type="checkbox" v-model="others[rowIndex * 3 + colIndex].checked" />
          </div>
        </td>
      </tr>
    </table>
  </div>   
  <button class = "submitButton" @click="submitForm">确认</button>
  <img src="../../assets/images/food.jpg" >
    </div>
    </div>
    
  </template>
  
  <script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// Define reactive variables for vegetables, fishes, and others
const vegetables = ref([
  { name: "吴中鸡头米", checked: false },
  { name: "太湖苑菜", checked: false },
  { name: "梅南水芹", checked: false },
  { name: "锦溪水红菱", checked: false },
  { name: "慈姑", checked: false },
  { name: "茭白", checked: false },
  { name: "华荠", checked: false },
  { name: "塘藕", checked: false },
  { name: "芋芳", checked: false }
]);
const fishes = ref([
  { name: "太湖大闸蟹", checked: false },
  { name: "太湖银鱼", checked: false },
  { name: "碧螺虾仁", checked: false },
  { name: "梅鲚鱼", checked: false },
  { name: "七都鮼", checked: false },
  { name: "鲤鱼", checked: false },
  { name: "箸塌鱼", checked: false },
  { name: "张家港鲋鱼", checked: false },
  { name: "吴江鲈鱼", checked: false },
  { name: "太湖活洁", checked: false },
  { name: "东山塘鱼", checked: false },
  { name: "阳澄湖大闸蟹", checked: false }
]);
const others = ref([
  { name: "洞庭碧螺春茶", checked: false }
]);

const submitForm = () => {
  // Handle the form submission logic
  console.log("Selected Vegetables:", vegetables.value.filter(vegetable => vegetable.checked));
  router.push('/cultureTable');

  // You can perform further actions, such as sending the data to a server
};

const backTo = () => {
  router.push('/cultureRestaurant');
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
  
.food {
    position: relative;
    top: 18%;
    left: 7%;
}
.title {
    position: relative;
    margin-top: 20px;
    background-color: rgba(255, 255, 255, 0);
    height: 3.4em;
    display: flex;
}

.diamond {
  width: 2em;
  height: 2.6em;
  background-color: rgb(162,127,120); /* 可以更改为你想要的颜色 */
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  margin-right: 10px;
  margin-top: -4px;
}

h3 {
  margin: 0;
  font-size:2.4em;
  color: rgb(89,87,87);
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
}

.content {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  position: relative;
  margin-bottom: 10px;
}
table {
  width: 90%;
  border-collapse: collapse;
}

td {
  padding: 10px;
  border: 1px solid #dddddd00;
}

.item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
}


input {
  margin-left: 1px;
}
.item p {
  margin: 0;
  margin-right: 2px;
  font-size:2em;
  color: rgb(89,87,87);
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
}

.submitButton{
    position: relative;
    text-align: center;
    font-size:2em;
    color: rgb(89,87,87);
    margin-left: auto;
    margin-right: 16%;
    width: 24%;
    border: 2px solid #ccc; 
    box-sizing: border-box;
}

.submitButton:active {
  background-color: lightgray; /* Change background color on click */
}

  </style>
  