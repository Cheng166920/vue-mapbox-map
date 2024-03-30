<template>
    <div>
        <MapBox :mapInfo="mapInfo" @listenToClick="listenToClick" @listenToBound="listenToBound"></MapBox>
        <TitlePop :title='title'></TitlePop>
        <div class = "back">
            <img src = "../../assets/images/back.png" @click="backTo">
        </div>
       <!-- 底部文本框 -->
        <div class="bottom-popup" v-if="showPopup">
            <button class="close-button" @click="closePopup">X</button>
            <div class="popup-content">
        <!-- 这里可以放置你的文本内容 -->
            <div class = "title">
                <div class="circle"></div>
                <h2>{{ popupTitle }}</h2>
            </div>
                <p>{{ popupText }}</p>
                <img v-if="imageFileName" :src="imageFileName" alt="Popup Image" />
            </div>
        </div>
        <div class="bottom-popup" v-if="showCustomPopup">
            <button class="close-button" @click="closeCustomPopup">X</button>
            <div class="popup-content">
        <!-- 这里可以放置你的文本内容 -->
                <div class = "title">
                    <div class="diamond"></div>
                    <h2>{{ customTitle }}</h2>
                </div>
                <table>
                    <tr v-for="(row, rowIndex) in Math.ceil(customElements.length / 2)" :key="rowIndex">
                        <td v-for="(element, colIndex) in 2" :key="colIndex">
                        <div class="item">
                        <p>{{ customElements[rowIndex * 2 + colIndex]}}</p>
                    </div>
                    </td>
                    </tr>
                </table>
            
            </div>
        </div>
    </div>
</template>
<script>
import * as turf from '@turf/turf';
// import mapboxgl from 'mapbox-gl';
import TitlePop from '../../components/TitlePop.vue';
import MapBox from '../../components/MapBox.vue';

export default {
    data: () => ({
        map: null,
        mapInfo: {
            path: '/src/assets/json/culture.json',
            center: [90, 10],
            minZoom: 1,
            zoom: 1,
            maxZoom: 3,
        },
        showPopup: false,// 控制文本框的显示状态
        showCustomPopup: false,
        popupText: "",
        popupTitle:"",
        imageFileName:"",
        title:"苏州文化",
        popupList: [
            { name: "house_hjpx", title: "河街平行", description: "河街平行，宅在街边，小巷迂回曲折，“小浜别派，旁夹路衢”。" },
            { name: "house_xdsz", title: "下店上宅", description: "小河居中，两岸屋宇，水栈、河埠嵌筑其间，拾级而下可就水而洗，或有廊桥连接两岸，是谓水巷(水街)。" },
            { name: "house_qdhz", title: "前店后宅", description: "前巷通后巷，几落几进，围以高墙，形成深宅大院。此种民居多有备弄连廊，设有天井、门楼，小型花园。" },
            { name: "house_qdhf", title: "前店后坊", description: "园林宅第，居宅豪华，花园较大，园中巧设亭台楼阁，山水佳卉交相辉映。" }
        ],
        customTitle:"",
        customElements:[],
        customList: [
            { name: "custom_literature", title: "民间文学", element: ["吴歌","吴地宝卷"] },
            { name: "custom_skill", title: "传统手工技艺", element: ["苏州御窑金砖制作技艺","明式家具制作技艺","碧螺春制作技艺","苏州民族乐器制作技艺","剧装戏具制作技艺","制扇技艺","苏州书画装裱修复技艺","姜思序堂国画颜料制作技艺"] },
            { name: "custom_medicine", title: "传统医药", element: ["雷允上六神丸制作技艺"] },
            { name: "custom_acrobatics", title: "传统曲艺", element: ["苏州评弹"] } ,
            { name: "custom_drama", title: "传统戏剧", element: ["苏剧","滑稽戏"] },
            { name: "custom_art", title: "民间美术", element: ["桃花坞木版年画","苏州彩灯","苏州泥塑","苏绣","苏派盆景技艺","苏州玉雕","光福核雕"] },
            { name: "custom_clothes", title: "民间服饰", element: ["苏州甪直水乡妇女服饰"] },
            { name: "custom_music", title: "民间音乐", element: ["江南丝竹", "苏州玄妙观道教音乐"] },
            { name: "custom_temple", title: "苏州庙会", element: ["苏州轧神仙庙会","金村庙会","圣堂庙会"] } 
        ]
    }),

    methods: {
        backTo(){
            this.$router.push('/');
        },

        listenToBound(map) {
            // 获取当前地图范围、缩放级别等信息
            var zoom = map.getZoom();
            var bounds = map.getBounds();
            var polygon = turf.polygon([[
                [bounds.getWest(), bounds.getSouth()],
                [bounds.getEast(), bounds.getSouth()],
                [bounds.getEast(), bounds.getNorth()],
                [bounds.getWest(), bounds.getNorth()],
                [bounds.getWest(), bounds.getSouth()]
            ]]);
            var customPolygon = turf.polygon([[
                [0, 10],
                [180, 10],
                [180, -90],
                [0, -90],
                [0, 10]
            ]]);
            var housePolygon = turf.polygon([[
                [0, 90],
                [105, 90],
                [105, 10],
                [0, 10],
                [0, 90]
            ]]);
            var dietPolygon = turf.polygon([[
                [105, 90],
                [180, 90],
                [180, 10],
                [105, 10],
                [105, 90]
            ]]);

            var maxIntersectionArea = 0;
            var maxIntersectionPolygon = null;

            // 判断与 customPolygon 的交集
            var customIntersection = turf.intersect(polygon, customPolygon);
            if (customIntersection) {
                var intersectionArea = turf.area(customIntersection);
                if (intersectionArea > maxIntersectionArea) {
                    maxIntersectionArea = intersectionArea;
                    maxIntersectionPolygon = 'custom';
                }
            }

            // 判断与 housePolygon 的交集
            var houseIntersection = turf.intersect(polygon, housePolygon);
            if (houseIntersection) {
                var intersectionArea = turf.area(houseIntersection);
                if (intersectionArea > maxIntersectionArea) {
                    maxIntersectionArea = intersectionArea;
                    maxIntersectionPolygon = 'house';
                }
            }

            // 判断与 dietPolygon 的交集
            var dietIntersection = turf.intersect(polygon, dietPolygon);
            if (dietIntersection) {
                var intersectionArea = turf.area(dietIntersection);
                if (intersectionArea > maxIntersectionArea) {
                    maxIntersectionArea = intersectionArea;
                    maxIntersectionPolygon = 'diet';
                }
            }

            // 根据这些信息更新标签的内容
            if(zoom <=1.5){
                // this.showCulture = true;
                // this.showHouse = false;
                // this.showDiet = false;
                // this.showCustom = false;
                this.title = '苏州文化';
            }
            else{
                // 最终根据 maxIntersectionPolygon 更新显示状态
                if (maxIntersectionPolygon === 'custom') {
                    this.title = '民风民俗';
                } else if (maxIntersectionPolygon === 'house') {
                    this.title = '枕水民居';
                } else if (maxIntersectionPolygon === 'diet') {
                    this.title = '鱼米之乡';
                } else {
                    this.title = '苏州文化';
                }

            }
            
        },

        listenToClick(map, e) {
            console.log(e.lngLat.lng, e.lngLat.lat);
            let layers;
            layers = map.getStyle().layers;
            console.log('Layers in the current map style:', layers);
            if(layers){
                    layers.forEach((layer) => {
                        const rasterLayerName = layer.id;
                        if (rasterLayerName == 'composite' || rasterLayerName == 'custom-image') {
                            // 跳过当前循环
                            return;
                        }
                        const rasterSource = map.getSource(rasterLayerName);
                        if(rasterSource){
                            const coordinates = rasterSource.coordinates;
                            if (coordinates) {
                                // 在这里使用 Turf.js 判断当前位置点是否在多边形内
                                const point = turf.point([e.lngLat.lng, e.lngLat.lat]);
                                const polygon = turf.polygon([ [coordinates[0],coordinates[1],coordinates[2],coordinates[3],coordinates[0]] ]);
                                if (turf.booleanPointInPolygon(point, polygon)) {
                                    console.log('当前位置点在多边形内'+ rasterLayerName);
                                    this.showMessage(rasterLayerName);
                                }
                            } else {
                                console.warn('未找到栅格图层');
                            }
                        }
                    })
            }   
        },
        showMessage(rasterLayerName){
            
            // const house = ['house_hjpx','house_xdsz','house_qdhz','house_qdhf']
            if(rasterLayerName == 'restaurant'){
                this.$router.push('/cultureRestaurant');
            }
            const matchedPopup = this.popupList.find(item => item.name === rasterLayerName);
            if(matchedPopup){
                this.popupText = matchedPopup.description;
                this.popupTitle = matchedPopup.title;
                this.imageFileName = "/src/assets/images/" + matchedPopup.name + ".jpg";
                this.showPopup = true;
            }
            else{
                this.popupText = '';
                this.popupTitle = '';
                this.imageFileName = '';
                this.showPopup = false;
            }
            const matchedCustom = this.customList.find(item => item.name === rasterLayerName);
            if(matchedCustom){
                this.customTitle = matchedCustom.title;
                this.customElements = matchedCustom.element;
                console.log(this.customElements)
                this.showCustomPopup = true;
            }
            else{
                this.customTitle = '';
                this.showCustomPopup = false;
            }
            
        },
        closePopup() {
            this.showPopup = false;
        },
        closeCustomPopup() {
            this.showCustomPopup = false;
        },


        
    }
}
</script>
<style lang="less" scoped>
.popup-content {
  /* 可以根据需要设置文本框内容的样式 */
  font-size: 30px;
  text-align: center;
  margin: 5%;
  line-height: 1.5;
  width: 100%;
  
}
.popup-content p {
    margin-left: 3%;
    margin-right: 3%;
}
.popup-content img{
    width: 80%; 
    height: auto; /* 保持高度自适应 */
    margin: 0 auto;
}
.popup-content table{
    width: 100%;
    text-align: left;
}
.title {
  display: flex;
  height: fit-content;
  align-items: center;
  padding-bottom: 5px;
  margin-top: -15px;
  margin-bottom: 10px;
}
.circle {
    display: flex;
    width: 16px;
    height: 16px;
    background-color: rgb(89,149,159); /* 设置圆形的背景颜色 */
    border-radius: 50%; /* 将方形元素变为圆形 */
    margin-right: 10px; /* 可以调整圆形和标题之间的间距 */
    margin-left: 3%;
  }
.diamond {
    width: 16px;
    height: 20px;
  background-color: rgb(89,149,159); /* 可以更改为你想要的颜色 */
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  margin-right: 10px;
  margin-left: 3%;
  margin-top: 2px;
}

  h2 {
    margin: 0;
    font-size: medium;
  }
/* 底部文本框样式 */
.bottom-popup {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color:rgb(255, 255, 255);
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


.jnLegend-content {
  position: absolute;
  width: 28%;
  height: 34px;
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
    width: 0.6rem;
    // height: 0.3rem;
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
    height: 23%;
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
    width: 0.3rem;
    // height: 0.3rem;
    margin: 0.06rem 0;
    margin-left: 10px;
}
.szLegend-content p {
    font-size: small;
    margin-left: 6px;
}

.back {
  position: absolute;
  top: 6%;
  right: 1.5%;
  /* Add any other styles you need */
  z-index: 1;
}
</style>
