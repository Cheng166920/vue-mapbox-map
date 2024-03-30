<template>
    <div>
        <div id="map"></div>
    </div>
</template>
<script setup name = 'MapBox'>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { defineProps } from 'vue';
import { defineEmits } from 'vue';
import mapboxgl from 'mapbox-gl';

const emit = defineEmits(['changePopup', 'listenToClick', 'listenToBound'])
const props = defineProps({
    mapInfo: {
        path: String,
        center: Array,
        minZoom: Number,
        zoom: Number,
        maxZoom: Number,
    }
});
const map = ref(null);
const initMap = () => {
    const { path, center, minZoom, zoom, maxZoom} = props.mapInfo;
    console.log(path, center, minZoom, zoom, maxZoom)
   
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2V5NTYzIiwiYSI6ImNsbHg1N25iYjFtb28zbHBoYzZza3hvdjYifQ.kIhZshouuoSoMk3K8kNimQ';
    map.value = new mapboxgl.Map({
        container: 'map',
        style: path,
        center: center,
        minZoom: minZoom,
        maxZoom: maxZoom,
        zoom: zoom
    });
    map.value.on('zoom', listenToZoom);
    map.value.on('moveend', listenToMove);
    map.value.on('click', listenToClick);
};
const listenToZoom = () => {
    const zoomLevel = map.value.getZoom();
    emit('changePopup', zoomLevel);

};
const listenToClick = (e) => {
   // console.log(e);
    emit('listenToClick', map.value, e);
}
const listenToMove = () => {
    emit('listenToBound', map.value);
};
onMounted(() => {
    initMap();

});

</script>
<style lang="less" scoped>
#map { position:absolute;top:0rem;bottom:0rem; width:100%; } 
.mapboxgl-ctrl {
    display: none !important;
}
.mapboxgl-ctrl-top-left {
    top: 42px; /* 调整控件向下的偏移量，根据需要进行调整 */
}
</style>
