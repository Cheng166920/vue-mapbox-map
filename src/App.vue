<template>
  <router-view />
  <div class = "bag" @click = "navigationBar">
      <img src = "./assets/images/bag.png">
  </div>
  <div v-if="showBar" class="toolbar">
            <button class="close-button" @click="closeBar">X</button>
            <!-- <div class="button-container">
                <button v-for="item in barList" :key="item.name" @click="navigateTo(item.path)" class="page-buttom">
                {{ item.name }}
                </button>
            </div> -->
            <ul class="nav-Bottom">
                <li v-for="item in barList" :key="item.name" @click="navigateTo(item.path)">
                    <img :src="'../src/assets/images/' + item.name + '-active' + '.png'" :alt="item.name">
                    <br>{{ item.meaning }}
                </li>
            </ul>
        </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useMainStore } from './store/index.js';
import { useRoute, useRouter } from 'vue-router';

const index = ref(1);
const showBar = ref(false);
const barList = ref([]);
const addedItems = reactive({});

const router = useRouter(); // 创建 router 实例

const navigationBar = () => {
    const counterStore = useMainStore();
    const params = counterStore.params;
    for (const item of params) {
        const key = item.name;
        if (!addedItems[key]) {
            if (key == 'location' || key == 'culture' || key == 'history') {
                barList.value.push({ 'name': item.name, 'path': item.path , 'meaning': item.meaning});
                addedItems[key] = true;
            }
        }
    }
    if (barList.value.length > 0) {
        showBar.value = true;
    }
};

const navigateTo = (path) => {
    router.push(path); // 使用 router 实例
    showBar.value = false;
};

const closeBar = () => {
    showBar.value = false;
};

// 监听路由的变化，在路由离开前关闭工具条
watch(
    () => router.currentRoute.value,
    (to, from) => {
        if (from && showBar.value) {
            showBar.value = false;
        }
    }
);

</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.fade-enter-active {
  transition: opacity 1s; /* 仅定义进入时的过渡效果 */
}
.fade-enter {
  opacity: 0; /* 进入时的初始状态 */
}
.bag {
  position: absolute;
  top: 8px;
  right: 1%;
  /* Add any other styles you need */
  z-index: 6;
}
.bag img {
  width: 60px; 
  height: 60px;
}
.toolbar{
  position: absolute;
  bottom: 6%;
  left: 50%;
  width: auto;
  height: auto;
  background-color: #ffffffbd;
  border: 1px solid #ccc;
  padding: 10px;
  transform: translateX(-50%);
  z-index: 6;
}
.close-button {
  position: absolute;
  right: 0; 
  top: 0;
  color: #1b1b1b;
  border: none;
  border-radius: 5px;
  padding: 5px 5px;
  cursor: pointer;
  margin-right: 5px; /* 调整按钮与文本框之间的间距 */
}

.button-container {
  display: flex;
  justify-content: center;
}

.page-buttom {
    margin: 10px; /* 适当调整间距大小 */
}

.nav-Bottom {
  display: flex;
  right: 1%;
  text-align: center;
  color: #5e5e5e;
  flex-direction:row; /* 将列表项排列成水平方向 */
  
  align-items: center; /* 水平居中对齐 */
  li {
      font-size: 24px;
      margin-left:30px; /* 调整列表项之间的垂直间距 */
      margin-right:30px;
      text-align: center;
      img {
          width: 50px;
          height: 50px;
          margin: 10px;
      }
      &.active {
          color: rgb(92,163,149);
      }
  }
}
</style>
