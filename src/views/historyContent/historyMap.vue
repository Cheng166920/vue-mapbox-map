<template>
    <div>
        <div id="map"></div>
        <div v-if="selectedTime === '现代'" style="position: absolute;top:0;left:0;width:100%;height:50%;z-index: 1;opacity: 1;background-color:aliceblue">
            <div id="transport_chart" style="width: 80%;height:90%;margin: auto;margin-top: 10%;"></div>
            <label class="switch">
                <input type="checkbox" v-model="series" @change="updateChart" />
                <span class="slider"></span>
            </label>
          
        </div>
        <!-- 滑块组件 -->
        <img
            :src= "imageName"
            alt="底图"
            style="position: absolute; bottom: 0; left: 0; width: 100%;height: auto;"
        />
        <div class="slider-container">
            <h2 style="margin-top: 1%;margin-left: -6%;text-align: left;font-size: 18px;color: rgb(101,165,151);font-weight: bold;">{{ title2 }}</h2>
            <p style="margin-top: 2%;margin-left: -6%;margin-bottom: 8%;font-size: small;">{{ source }}</p>
        <vue-slider v-model="selectedTime" :adsorb="true"
            :data="timeMarks"
            :marks="true"
            :label-style="{ fontSize: '14px'}"
            :process-style="{ backgroundColor: 'rgb(101,165,151)'}"
            :tooltip-style="{ backgroundColor: 'rgb(101,165,151)', borderColor: 'rgb(101,165,151)', fontSize: '14px'}" >
                <template v-slot:dot="{ value, focus }">
                    <div :class="['custom-dot', { focus }]"></div>
                </template>
            </vue-slider>
            <p style="margin-top: 12%;margin-left: -6%;margin-right: -6%;margin-bottom: 2%;font-size: 15px;line-height: normal;z-index: 1;">{{ description }}</p>
            
        </div>
    
        <TitlePop :title="title"></TitlePop>
        <div v-if="historyLegend">
            <div class="szLegend-content" v-if="selectedTime === '史前'">
                <ul class = "legend-ul">
                    <li>
                        <img src="../../assets/images/settlement.png" >
                        <p  style="font-weight: bold;">早期聚落点</p>
                </li>
                <li>
                        <img src="../../assets/images/mountain.png" >
                        <p  style="font-weight: bold;">山体</p>
                </li>
                <li>
                        <img src="../../assets/images/waters.png">
                        <p  style="font-weight: bold;">水域</p>
                </li>
                
                <li>
                        <img src="../../assets/images/shoal.png" >
                        <p  style="font-weight: bold;">沼泽性浅滩</p>
                </li>
                </ul>
            </div>
            <div class="szLegend-content" v-if="selectedTime === '吴越'">
                <ul class = "legend-ul">
                    <li>
                        <img src="../../assets/images/gate.png" >
                        <p  style="font-weight: bold;color: rgb(129,91,38);">城门</p>
                </li>
                <li>
                        <img src="../../assets/images/political_center.png" >
                        <p  style="font-weight: bold;color: rgb(111,21,28);">政治中心</p>
                </li>
                <li>
                        <img src="../../assets/images/present_channel.png">
                        <p  style="font-weight: bold;">今河道</p>
                </li>
                
                <li>
                        <img src="../../assets/images/present_street.png" >
                        <p  style="font-weight: bold;">今街道</p>
                </li>
                <li>
                        <img src="../../assets/images/ancient_channel.png" >
                        <p  style="font-weight: bold;">推测古河道</p>
                </li>
                <li>
                        <img src="../../assets/images/ancient_area.png" >
                        <p  style="font-weight: bold;">推测古城垣区</p>
                </li>
                <li>
                        <img src="../../assets/images/ancient_street.png" >
                        <p  style="font-weight: bold;">推测古街道</p>
                </li>
                </ul>
            </div>
            <div class="szLegend-content" v-if="selectedTime === '秦汉'">
                <ul class = "legend-ul">
                <li>
                        <img src="../../assets/images/mountain.png" >
                        <p  style="font-weight: bold;">山体</p>
                </li>
                <li>
                        <img src="../../assets/images/waters.png">
                        <p  style="font-weight: bold;">水域</p>
                </li>
                
                <li>
                        <img src="../../assets/images/shoal.png" >
                        <p  style="font-weight: bold;">沼泽性浅滩</p>
                </li>
                <li>
                        <img src="../../assets/images/field.png">
                        <p  style="font-weight: bold;">圩田</p>
                </li>
                </ul>
            </div>
            <div class="szLegend-content" v-if="selectedTime === '隋唐'">
                <ul class = "legend-ul">
                <li>
                        <img src="../../assets/images/hill.png" >
                        <p  style="font-weight: bold;color: rgb(45,106,52);">山体</p>
                </li>
                <li>
                        <img src="../../assets/images/bridge.png">
                        <p  style="font-weight: bold;color: rgb(89,87,87);">桥</p>
                </li>
                
                <li>
                        <img src="../../assets/images/gate.png" >
                        <p  style="font-weight: bold;color: rgb(129,91,38);">城门</p>
                </li>
                <li>
                        <img src="../../assets/images/drainage.png">
                        <p  style="font-weight: bold;color: rgb(146,179,196);">水系</p>
                </li>
                </ul>
            </div>
            <div class="szLegend-content" v-if="selectedTime === '明清'" style="width: 50%;">
                <div id="chart" style="width: 98%;height:80%;margin: 10px 0;"></div>
            </div>
       </div>
        <ButtonTool @legendOpen="legendOpen"></ButtonTool>
       <!-- 底部文本框 -->
        <div class="bottom-popup" v-if="showPopup">
            <button class="close-button" @click="closePopup">X</button>
            <div class="popup-content">
        <!-- 这里可以放置你的文本内容 -->
                <p>江南字面意义为江之南面，其所指地区从春秋时期的长江中游逐渐向长江下游平原的南岸地区变化，根据各朝代行政边界有所调整。现代狭义即指明清太湖流域的“八府一州” 所辖区域，即苏州、松江、常州、镇江、江宁、杭州、嘉兴、湖州八府，以及由苏州府划出的太仓直隶州。自隋唐时期以来，江南逐渐成为了物产丰富、经济发达、文化昌盛的代言词。</p>
            
            </div>
        </div>
        <div class = "back">
            <img src = "../../assets/images/back.png" @click="backTo">
        </div>
    </div>
</template>
<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import * as echarts from 'echarts';
import { markRaw } from 'vue';
import mapboxgl from 'mapbox-gl';
import TitlePop from '../../components/TitlePop.vue';
import ButtonTool from '../../components/ButtonTool.vue';

    export default {
        data: () => ({
        map: null,
        popup:null,
        chart:null,
        series:true,
        transport_chart:null,
        imageName:'/src/assets/images/prehistory.jpg',
        mapStyle:'/src/assets/json/prehistory.json',
        showPopup: false,// 控制文本框的显示状态
        title:'史前文明',
        title2:'史前聚落分布',
        source:'来源:《太湖水利技术史》',
        description:'距今5300-4500年左右，太湖东岸出现人类活动，逐渐发展出良渚文化、马家浜文化等原始文化形态,这是苏州一带关于人类活动的最早记录。',
        index:1,
        index1:1,
        legend:0,
        historyLegend:false,
        index2:false,
        value: 0,
        selectedTime: '史前',
        timeMarks: {
            史前: '史前文明',
            吴越: '阖闾古城',
            秦汉: '围水造田',
            隋唐: '修筑运河',
            明朝: '舟楫千里',
            明清: '江南富庶',
            现代: '水运强市'
    
        },
        historyMapList:[
            { name: "史前", style: "prehistory", center: [120.56,31.3],minZoom:9,zoom:9,title2:'史前聚落分布',source:'来源:《太湖水利技术史》',description:'距今5300-4500年左右，太湖东岸出现人类活动，逐渐发展出良渚文化、马家浜文化等原始文化形态,这是苏州一带关于人类活动的最早记录。'},
            { name: "吴越", style: "wucheng", center: [120.595,31.32],minZoom:13,zoom:13.3,title2:'吴城推测示意图',source:'来源:《越绝书》《吴越春秋》',description:'伍子胥初建阖闾大城（即苏州古城）时，就每面城垣设两门，水陆城门各八个，利用西高东低的地势，引入八条河流贯通全城成为密集的河道，开始了内城水网的营建，城市水系格局初具规模。' },
            { name: "秦汉", style: "field", center: [120.56,31.3],minZoom:9,zoom:9,title2:'秦汉时期苏州围田主要分布',source:'来源:《太湖水利技术史》',description:'圩田(围田）是一种筑堤围挡水护田的土地利用方式,围内开沟设闸用以排水灌水。公元前514年，吴国在吴楚边界的战略要地濑渚邑以西围固城湖造相国圩，是江南地区最早的圩田，至今仍存。' },
            { name: "隋唐", style: "canal", center: [120.55,31.34],minZoom:9,zoom:11,title2:'运河风景轴示意',source:'来源:《长洲县志》《吴中水利全书》《姑苏志》等',description:'隋炀帝时期，京杭大运河南北贯通，大运河从苏州古城西部流过，城内引运河水经由城西枫桥镇附近入城内，至西之阊门和北之齐门后由东部娄门与南部盘门流出，再度与大运河主干道汇合，阊门成为了运河出入城的重要节点。大运河促进了城市西部阊门片区的商业发展，进而带动了城市向西面以水运和自然风景为导向的扩张。' } ,
            { name: "明朝", style: "waterway", center: [120.3,31.25],minZoom:6,zoom:6.5,title2:'明苏州府至各地水路图',source:'来源:《士商类要》',description:'' },
            { name: "明清", style: "economy", center: [120.55,31.3],minZoom:8,zoom:8.8,title2:'明清时期苏州市镇聚落产业分工',source:'来源:《姑苏志》',description:'明清时期，苏州成为江南区域的经济文化中心。作为全国最大的商业城市，苏州及其近郊集中了全国最大的稻米、棉布、丝绸、木材等市场，其商业腹地辐射到全国大多数地方，人称“凡四方难得之货，靡所不有……天下财货莫不盛于苏州”。' },
            { name: "现代", style: "canal", center: [120.56,31.3],minZoom:9,zoom:9,title2:'水运强市',source:'来源: 统计数据',description:'2021年苏州市内河区域货运量2.51亿吨，位居全省第1；苏州内河集装箱吞吐量10.44万标箱，近三年年均增速达81.59%。苏州是“水运大市”，拥有“天然良港”和“黄金水道”，是长三角区域内河水运最为发达的地区之一。苏州市深入响应党中央、国务院加快水运发展的工作要求，不断调整运输结构，为建设安全、便捷、高效、绿色、经济的内河航运体系持续发力，不断推动苏州从“水运大市”向“水运强市”迈进。随着港航综合治理能力的稳步提升，为苏州市经济发展发挥了良好的支撑作用。' }
        ]

    }),
    components: {
        VueSlider,
    },
    watch: {
    selectedTime(newValue) {
      // Update map style based on slider's value
      this.updateMapStyle(newValue);
      const value = this.timeMarks[newValue]
      if (value) {
        this.title = value;
      }
      if(newValue == '明清'){
        this.legendOpen();
        this.legendOpen();
      }
      else if(newValue == '现代'){
        this.$nextTick(() => {
                    // 在DOM更新后初始化ECharts
                    this.initTransportChart();
        });
        
      }
      
    },
  },
    methods: {
        backTo(){
            this.$router.push('/culture');
        },
        ump(link,index1){
                location.href = link;
                this.index1=index1;
            },
        initMap() {
            mapboxgl.accessToken = 'pk.eyJ1Ijoia2V5NTYzIiwiYSI6ImNsbHg1N25iYjFtb28zbHBoYzZza3hvdjYifQ.kIhZshouuoSoMk3K8kNimQ'; 
            this.map = new mapboxgl.Map({
                container: 'map',
                style: this.mapStyle,
                center: [120.56, 31.3],
                minZoom: 9,
                zoom: 9
            });
            // this.map = new mapboxgl.Map({
            //     container: 'map',
            //     style: '/lib/field.json',
            //     center: [120.56, 31.3],
            //     minZoom: 9,
            //     zoom: 9
            // });
            // this.map = new mapboxgl.Map({
            //     container: 'map',
            //     style: '/lib/wucheng.json',
            //     center: [120.595, 31.32],
            //     minZoom: 13,
            //     zoom: 13.3
            // });
            // this.map = new mapboxgl.Map({
            //     container: 'map',
            //     style: '/lib/waterway.json',
            //     center: [120.3, 31.25],
            //     minZoom: 6,
            //     zoom: 6.5
            // });
            // this.map = new mapboxgl.Map({
            //     container: 'map',
            //     style: '/lib/economy.json',
            //     center: [120.55, 31.3],
            //     minZoom: 8,
            //     zoom: 8.8
            // });

            // this.map = new mapboxgl.Map({
            //     container: 'map',
            //     style: '/lib/canal.json',
            //     center: [120.55, 31.34],
            //     minZoom: 7,
            //     zoom: 11
            // });
             this.map.on('click', (e) => {
                var coordinates = e.lngLat;
                var zoomLevel = this.map.getZoom();
                window.alert('经度: ' + coordinates.lng + '\n纬度: ' + coordinates.lat + '\n缩放等级:' + zoomLevel);
            });
            
            this.listenToZoom(); // 监听缩放事件

        },
        listenToZoom(){
            this.map.on('zoom', () => {
                const zoomLevel = this.map.getZoom();
                if(this.selectedTime == '隋唐'){
                    if(zoomLevel >11.5){
                        this.title2 = '苏州古城阊门处五水交汇示意'
                    }
                    else if(zoomLevel <=11.5){
                        this.title2 = '运河风景轴示意'
                    }
                    if (this.popup) {
                        this.popup.remove();
                    }
                }
            })
        },
        updateMapStyle(selectedTime) {
            // Modify map style based on selectedTime
            // For example, you can dynamically construct the style URL
            const foundMap = this.historyMapList.find(map => map.name === selectedTime);
        if (foundMap) {
            this.imageName = `/src/assets/images/${foundMap.style}.jpg`;  
            this.title2 = foundMap.title2;
            this.source = foundMap.source;
            this.description = foundMap.description;
            this.mapStyle = `/src/assets/json/${foundMap.style}.json`;  
            // Set the new style for the map
            this.map.setCenter(foundMap.center);
            this.map.setMinZoom(foundMap.minZoom);
            this.map.setZoom(foundMap.zoom);
            this.map.setStyle(this.mapStyle);
            console.log(foundMap.zoom)
            if(selectedTime == '现代'){
                this.imageName = `/src/assets/images/transport.jpg`;  
            }
            if(selectedTime == '隋唐'){
                this.popup = new mapboxgl.Popup({ closeButton: true })
                .setLngLat([120.65, 31.48])
                .setHTML('<h3 style = "font-size:16px;">试试缩放吧！</h3>')
                .addTo(this.map);
            }
            else{
                if (this.popup) {
                    this.popup.remove();
                }
            }
            
        } 
        },
        closePopup() {
            this.showPopup = false;
        },
        legendOpen() {
            if(this.index == 1){
                this.index = 0;
                this.historyLegend = true;    
                this.$nextTick(() => {
                    // 在DOM更新后初始化ECharts
                    this.initChart();
                    });
                
            }
            else{
                this.index = 1;
                this.historyLegend = false;

            }
            
            
        },
        initChart() {
            // 获取图表容器
            const chartContainer = document.getElementById('chart');
            if(chartContainer){
            // 创建ECharts实例
            this.chart = markRaw(echarts.init(chartContainer));
            const options = {
                series: [
                {
                    type: 'pie',
                    radius: '50%',
                    startAngle: 0,
                    color: ['rgb(223,219,158)','rgb(217,171,104)', 'rgb(142,190,141)'],
                    itemStyle:{
                        borderWidth:2, //设置border的宽度有多大
                        borderColor:'#fff',
                    },
                    data: [
                        { value: 1 / 3, name: '手工业' },
                        { value: 1 / 3, name: '商业'},
                        { value: 1 / 3, name: '农业' },
                        
                    ],
                    label: {
                    formatter: '{b}', // 显示标签内容
                    fontSize: 12,
                    connector: {
                        show: true,
                        color: 'rgb(181,182,182)', 
                    },
                    },
                },
                ],
            }; 
            // 使用配置项设置图表
            this.chart.setOption(options);
        }else
            {
                console.error(chartContainer)
            }
        },
        initTransportChart() {
            // 获取图表容器
            const chartContainer = document.getElementById('transport_chart');
            if(chartContainer){
            // 创建ECharts实例
            this.transport_chart = markRaw(echarts.init(chartContainer));
            // 配置项
            var options_mt = {
            title: [
                {
                text: '港口货物吞吐量（万吨）',
                left: 'center',
                top:'0%'
             
                }
            ],
            polar: {
                radius: [30, '80%']
            },
            angleAxis: {
                max: 700,
                startAngle: 90,
                axisTick: {
                    show: false // 设置为 false，取消刻度的显示
                },
                axisLabel:{
                    show:false
                },
                axisLine: {
                    show: false // 设置为 false，取消坐标轴线的显示
                }
            },
            radiusAxis: {
                type: 'category',
                data: ['1971', '1974', '1978', '1982','1985'],
                axisLabel: {
                show: true, // 设置为 true，显示坐标轴标签
                interval: 0, // 设置为 0，表示所有标签都显示
                rotate: 0 // 标签不旋转
                },
                axisTick: {
                    show: false // 设置为 false，取消刻度的显示
                },
                axisLine: {
                    show: false // 设置为 false，取消坐标轴线的显示
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: (params) => {
                const year = params[0].axisValue;
                const value = params[0].data;
                return `${year}年 ${value}万吨`;
                },
                axisPointer: {
                type: 'shadow'
                }
            },
            series: {
                type: 'bar',
                data: [211.5, 239.6, 603.3, 640.6, 644.7],
                coordinateSystem: 'polar',
                label: {
                show: true,
                position: 'middle',
                color:'rgb(255,255,255)',
                formatter: '{c}'
                },
                itemStyle: {
                    color: 'rgb(161,214,205)' // 设置所有柱子的颜色为固定颜色
                }
            }
            };
            var options_km = {
            title: [
                {
                text: '内河航运通航里程（公里）',
                left: 'center',
                top:'0%'
                }
            ],
            polar: {
                radius: [30, '80%']
            },
            angleAxis: {
                max: 3200,
                startAngle: -90,
                axisTick: {
                    show: false // 设置为 false，取消刻度的显示
                },
                axisLabel:{
                    show:false
                },
                axisLine: {
                    show: false // 设置为 false，取消坐标轴线的显示
                }
            },
            radiusAxis: {
                type: 'category',
                data: ['1949', '1985', '2000', '2010','2020'],
                axisLabel: {
                show: true, // 设置为 true，显示坐标轴标签
                interval: 0, // 设置为 0，表示所有标签都显示
                rotate: 0 // 标签不旋转
                },
                axisTick: {
                    show: false // 设置为 false，取消刻度的显示
                },
                axisLine: {
                    show: false // 设置为 false，取消坐标轴线的显示
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: (params) => {
                const year = params[0].axisValue;
                const value = params[0].data;
                return `${year}年 ${value}公里`;
                },
                axisPointer: {
                type: 'shadow'
                }
            },
            series: {
                type: 'bar',
                data: [415.6, 1870.0, 2896.7, 2764.6, 2786.4],
                coordinateSystem: 'polar',
                label: {
                show: true,
                position: 'middle',
             
                color:'rgb(255,255,255)',
                formatter: '{c}'
                },
                itemStyle: {
                    color: 'rgb(201,229,213)' // 设置所有柱子的颜色为固定颜色
                }
            }
            };
            // 使用配置项设置图表
            if(this.series){
                this.transport_chart.setOption(options_mt);
            }
            else{
                this.transport_chart.setOption(options_km);
            }
            
        }else
            {
                console.error(chartContainer)
            }
        },
        updateChart() {
            if (this.transport_chart) {
                this.transport_chart.dispose();
            }
            this.initTransportChart();
        },
        resizeChart() {
            if (this.chart) {
                this.chart.resize();
            }
        }


       
    },
    mounted() {
        this.initMap();
       // this.initChart();
       window.addEventListener('resize', this.resizeChart);
        
    },
    beforeDestroy() {
    // 7. 在组件销毁前移除窗口大小变化事件监听器，以防止内存泄漏
        window.removeEventListener('resize', this.resizeChart);
    }
    }
</script>
<style lang="less" scoped>
#map { position:absolute;top:0rem;bottom:50%; width:100%; } 
.toggle-button {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 10px; /* 调整按钮与图表的间距 */
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
}
.slider-container {
  position: absolute;
  top:50%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 83%;
}
.custom-dot {
    width: 100%;
    height: 100%;
    border-radius: 0;
    background-color: rgb(101,165,151);
    transition: all .3s;
  }
  .custom-dot:hover {
    transform: rotateZ(45deg);
  }
  .custom-dot.focus {
    border-radius: 50%;
  }
  
.mapboxgl-ctrl-top-left {
    top: 42px; /* 调整控件向下的偏移量，根据需要进行调整 */
}
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


.szLegend-content {
    position: absolute;
  width: auto;
  height: auto;
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
    width: 0.55rem;
    // height: 0.3rem;
    margin: 0.06rem 0;
    margin-left: 10px;
}
.szLegend-content p {
    font-size: small;
    margin-left: 6px;
}
.legend-ul {
    margin: 10px 20px 10px 10px;
}
.legend-ul li {
    display: flex; /* 使用Flexbox布局 */
    align-items: center; /* 垂直居中对齐 */
}

.legend-ul li img {
    margin-right: 6px; /* 调整图标和文字之间的间距 */
}


/* 底部文本框样式 */
.echart {
  position: absolute;
  width: 100%;
  height: 25%;
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

.switch {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 3%; /* 调整按钮与图表的间距 */
  display: inline-block;
  width: 54px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(201,229,213);
  transition: 0.4s;
  border-radius: 28px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: rgb(161,214,205);
}

input:checked + .slider:before {
  transform: translateX(26px);
}


</style>
