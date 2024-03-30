<template>
    <div>
        <TitlePop :title='title'></TitlePop>
        <MapBox :mapInfo="mapInfo" @changePopup="changePopup"></MapBox>
        <BottonTool @legendOpen="legendOpen"></BottonTool>
        
        <div class="jnLegend-content" v-if="jnLegend">
            <img src="../../assets/images/legend-area.png">
            <p style="font-weight: bold; padding: 2px;">江南区域</p>
        </div>
        <div class="szLegend-content" v-if="szLegend">
            <ul class = "legend-ul">
                <li>
                    <img src="../../assets/images/village.png">
                    <p style="font-weight: bold;">传统村落</p>
               </li>
               <li>
                    <img src="../../assets/images/town.png" >
                    <img src="../../assets/images/town-label.png" style="width: 80px;">
               </li>
               <li>
                    <img src="../../assets/images/port.png">
                    <img src="../../assets/images/port-label.png" style="width: 36px;">
               </li>
               <li>
                    <img src="../../assets/images/garden.png">
                    <img src="../../assets/images/garden-label.png" style="width: 150px;">
               </li>
               <li>
                    <img src="../../assets/images/historical_city.png">
                    <img src="../../assets/images/historical-label.png" style="width: 90px;">
               </li>
               <li>
                    <img src="../../assets/images/canal.png" style="width: 36px;">
                    <p  style="font-weight: bold;">世界文化遗产 · 中国大运河苏州段</p>
               </li>
            </ul>
        </div>
        <div class = "climate" @click="climateOpen" :class="{'active':climate==0}" v-if="index2">
            <img src="../../assets/images/climate.png"  v-if="climate ==1">
            <img src="../../assets/images/climate-active.png"  v-if="climate !=1">
            <p>气候</p>
        </div>
        
        <div class="echart" v-if="showEchart">
            <div id="chart" style="width: 98%;height:80%;"></div>
        </div>
       
        <!-- 底部文本框 -->
        <div class="bottom-popup" v-if="showPopup">
            <button class="close-button" @click="closePopup">X</button>
            <div class="popup-content">
                <p>江南字面意义为江之南面，其所指地区从春秋时期的长江中游逐渐向长江下游平原的南岸地区变化，根据各朝代行政边界有所调整。现代狭义即指明清太湖流域的“八府一州” 所辖区域，即苏州、松江、常州、镇江、江宁、杭州、嘉兴、湖州八府，以及由苏州府划出的太仓直隶州。自隋唐时期以来，江南逐渐成为了物产丰富、经济发达、文化昌盛的代言词。</p>
            </div>
        </div>
        <div class = "back">
            <img src = "../../assets/images/back.png" @click="backTo">
        </div>
    </div>
</template>
<script setup>
import MapBox from '../../components/MapBox.vue';
import TitlePop from '../../components/TitlePop.vue';
import BottonTool from '../../components/ButtonTool.vue';
import * as echarts from 'echarts';
import { markRaw } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted, onBeforeUnmount, nextTick } from 'vue';

//const path = '/src/assets/json/streets.json';
const mapInfo = {
    path:'/src/assets/json/streets.json',
    center: [120.2, 30.9],
    minZoom: 3,
    zoom: 6.5,
    maxZoom: 18
}
let title = ref('江南区域');
const showPopup = ref(false);
const zoomLevel = ref(0);
const index = ref(1);
const jnLegend = ref(false);
const szLegend = ref(false);
const climate = ref(1);
const index2 = ref(false);
const showEchart = ref(false);
let chart = null;
const router = useRouter();

const backTo = () => {
    router.push('/history');
};

const changePopup = (zoom) => {
    const showPopupZoomThreshold = 7.5;
    zoomLevel.value = zoom;
    if (zoom < showPopupZoomThreshold) {
        showPopup.value = true;
        index2.value = false;
        title.value = '江南区域';

    } else {
        showPopup.value = false;
        index2.value = true;
        title.value = '水润苏州';
    }
    
}

const closePopup = () => {
    showPopup.value = false;
};

const legendOpen = () => {
    const showPopupZoomThreshold = 7.5;

    if (index.value == 1) {
        index.value = 0;
        if (zoomLevel.value < showPopupZoomThreshold) {
            jnLegend.value = true;
            szLegend.value = false;
        } else {
            jnLegend.value = false;
            szLegend.value = true;
        }
    } else {
        index.value = 1;
        jnLegend.value = false;
        szLegend.value = false;
    }
};

const climateOpen = () => {
    if(climate.value == 1) {
        climate.value = 0;
        showEchart.value = true;
        nextTick(() => {
            // 在DOM更新后初始化ECharts
            initChart();
        });
    }
    else{
        climate.value = 1;
        showEchart.value = false;

    }
};

const initChart = () => {
    // 获取图表容器
    const chartContainer = document.getElementById('chart');
    if(chartContainer){
    // 创建ECharts实例
    chart = markRaw(echarts.init(chartContainer));

    // 在这里配置图表选项
    const years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
    const precipitationData = [931.9, 911.0, 1308.1, 1206.5, 1118.3, 1601.1, 1974.3, 1224.6, 1369.2, 1120.9, 1569.6, 1318.6];
    const temperatureData = [17.0, 16.9, 17.0, 17.7, 17.1, 17.1, 17.6, 17.9, 17.8, 17.6, 17.9, 18.3];

    // 指定图表的配置项和数据
    const options = {
        title: {
            text: '苏州降水、气温历年变化\n ',
            textStyle: { // 设置标题文本样式
                fontSize: 16, // 标题字体大小为 20px
            }
    
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: ['年降水量', '年平均气温'],
            //right: 1,
            textStyle: {
            fontSize: 12 // 设置标签字体大小为12
            },
            top:'13%',
            itemGap: 3,
            //padding: [40, 11, 20, 37]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '1%',
            containLabel: true,
            
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: years,
            axisLabel: {
            interval: 1, // 0 表示所有刻度都显示，1 表示间隔一个显示，依此类推
        },
        },
        yAxis: [
            {
                type: 'value',
                name: '年降水量 (mm)',
                min: 500,
                max: 2500,
                interval: 1000,
            },
            {
                type: 'value',
                name: '年平均气温 (°C)',
                min: 16.5,
                max: 18.5,
                interval: 1,
            },
        ],
        series: [
        {
            name: '年降水量',
            type: 'line',
            data: precipitationData,
            yAxisIndex: 0,
            lineStyle: {
                color: 'rgb(140, 194, 190)', // 设置线条颜色
            },
            itemStyle: {
                color: 'rgb(140, 194, 190)', // 设置数据点颜色
            },
        },
        {
            name: '年平均气温',
            type: 'line',
            data: temperatureData,
            yAxisIndex: 1,
            lineStyle: {
                color: 'rgb(226, 173, 144)', // 设置线条颜色
            },
            itemStyle: {
                color: 'rgb(226, 173, 144)', // 设置数据点颜色
            },
        },
        ],
        
    };

    // 使用配置项设置图表
    chart.setOption(options);
    }
    else
    {
        console.error(chartContainer)
    }
};
// 在需要的时候重新渲染图表
const resizeChart = () => {
    if (chart) {
        chart.resize();
    }
};

onMounted(() => {
    window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart);
});

</script>
<style lang="less" scoped>
.popup-content {
  /* 可以根据需要设置文本框内容的样式 */
  font-size: 30px;
  text-align: left;
  margin: 6%;
  line-height: 1.5;
}
/* 底部文本框样式 */
.bottom-popup {
  position: absolute;
  width: 100%;
  
  bottom: 0;
  left: 0;
  background-color:rgba(255, 255, 255, 0.6);
  padding: 0px;
  border-style:dotted;
  border-width:0px;
  border-color: rgb(101,165,151);
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  
}
/* 顶部文本框样式 */

/* 关闭按钮样式 */
.close-button {
  position: absolute;
  right: 0; 
  top: 0;
  color: #1b1b1b;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 10px; /* 调整按钮与文本框之间的间距 */
}


.jnLegend-content {
  position: absolute;
  width: 28%;
  //height: 34px;
  top: 8px;
  right: 12%;
  border-radius: 4px;
  background-color:rgba(255, 255, 255, 1);
  border-style:unset;
  border-width:2px;
  border-color: rgb(101,165,151);
  padding: 0px;
  box-shadow: 0px 0px 10px rgba(78, 112, 139, 0.6);
  display: flex;
  justify-content: left; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.jnLegend-content img {
    width: 70px;
    //height: 60px;
    margin: 0.06rem 0;
    margin-left: 10px;
}
.jnLegend-content p {
    font-size: small;
    margin-left: 6px;
}

.szLegend-content {
    position: absolute;
  width: 50%;
  //height: 23%;
  top: 8px;
  right: 12%;
  border-radius: 4px;
  background-color:rgba(255, 255, 255, 1);
  border-style:unset;
  border-width:2px;
  border-color: rgb(101,165,151);
  padding: 0px;
  box-shadow: 0px 0px 10px rgba(78, 112, 139, 0.6);
  display: flex;
  justify-content: left; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.szLegend-content img {
    width: 36px;
    // height: 0.3rem;
    margin: 0.06rem 0;
    margin-left: 10px;
}
.szLegend-content p {
    font-size: small;
    margin-left: 6px;
}
.legend-ul{
    padding: 10px;
}
.legend-ul li {
    display: flex; /* 使用Flexbox布局 */
    align-items: center; /* 垂直居中对齐 */
}

.legend-ul li img {
    margin-right: 6px; /* 调整图标和文字之间的间距 */
}

.climate {
    position: absolute;
  top: 160px;
  left: 8px;
  text-align: center;
  color: #5e5e5e;
  &.active {
            color: rgb(92,163,149);
        }
}
.climate img {
    width: 40px;
    height: 40px;
    margin: 0.06rem 0;
}
.climate p {
    
    font-size: 20px;
}

/* 底部文本框样式 */
.echart {
  position: absolute;
  width: 100%;
  height: 26%;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 0px;
  border-style: dotted;
  border-width: 0px;
  border-color: rgb(101, 165, 151);
  /* 这些样式将内容居中，如果你不需要居中，可以注释掉 */
  display: flex;
  justify-content: center;
  align-items: center; 
}

</style>
