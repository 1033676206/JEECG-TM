<template>
  <h1>{{ msg }}</h1>
  <button @click="zoomin">放大</button>
  <button @click="zoomout">缩小</button>
  <div id="cesiumMap"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import positionIcon from '@/assets/myResource/images/position.png';
//import positionIcon from /src/assets/myResource/images/position.png
//import positionIcon from "../assets/position.png";
//import positionIcon from ".../assets/myResource/images/position.png";
//import nbqx from "./宁波市行政边界.json";
import nbqx from '/@/assets/myResource/js/宁波市行政边界.json';

defineProps({
  msg: String,
});
const count = ref(0);

const cesiumMap = ref(null);


// 此处留名 修改者：ZX
//gis  leafet, cesium, openlayers, mapbox 
//leafet  二维平面，简单易上手
//cesium  三维地球，复杂，学习曲线陡峭 
//openlayers  二维地图，复杂，学习曲线陡峭 , proj4js  结合使用可以自定义坐标系。
//mapbox  二维、三维地图，复杂，学习曲线陡峭，收费， 目前使用不了，注册国外IP地址，国外的邮箱

//学习地址 ： leaflet： https://leafletjs.cn/examples/quick-start/   openlayers: https://blog.csdn.net/weixin_43390116/article/details/122326847l 
//底图放大
const zoomin = () => {
  cesiumMap.value.zoomIn();
};

//底图缩小
const zoomout = () => {
  cesiumMap.value.zoomOut();
};

onMounted(() => {
  // cesiumMap.value = L.map("cesiumMap").setView([51.505, -0.09], 13);
  cesiumMap.value = L.map("cesiumMap", {
    center: [29.803566, 121.557708],  //初始坐标，定位中心
    zoom: 10, //初始缩放级别
    zoomControl: true,//鼠标控制
    maxzoom: 18, //最大倍数
    minzoom: 1, //最小倍数
    crs: L.CRS.EPSG4326,  //坐标系
  })

  //添加图层 底图， 天地图 （影像、矢量）
  // /天地图加载地址
  const IMG_C =
    "http://t1.tianditu.com/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=3cf92df1e46b9a576fa8d3f427030886"; //tk:天地图tk，官网注册认证，获取
  
  L.tileLayer(IMG_C, {
    zoomOffset: 1,
    maxZoom: 18,
    minZoom: 1,
    tileSize: 256,
    attribution: "天地图",
  }).addTo(cesiumMap.value);



  //添加线 L.polyline
  const polyline = L.polyline([
    [29.803566, 121.557708],
    [29.803566, 121.557708],
    [29.803566, 121.557708],
    [29.803566, 121.557708],
  ], {
    color: "red", //线颜色
    weight: 5, //线宽
    opacity: 0.7, //线透明度
    smoothFactor: 1,
  }).addTo(cesiumMap.value);

  //添加marker
  const marker = L.marker([29.803566, 121.557708], {
    icon: L.icon({
      iconUrl: positionIcon,
      iconSize: [30, 30], //图标大小
      iconAnchor: [15, 30], //图标锚点
      popupAnchor: [0, -30], //弹出框锚点
    }),
  }).addTo(cesiumMap.value);

  //添加弹出框
  // marker.bindPopup(
  //   "<div style='color:red'>天地图</div><br/>这是一个弹出框"
  // );

  marker.on("click", function (e) {
    console.log(e,'mark点击事件');
  })

  //添加geojson格式数据 L.geoJson加载
  L.geoJson(nbqx, {
    style: function (feature) {
      return {
        color: "red", //线颜色
        weight: 6, //线宽
        opacity: 0.7, //线透明度
        fillColor: "blue", //填充颜色
        fillOpacity: 0.5, //填充透明度
      };
    },
  }).addTo(cesiumMap.value);


  //添加geoserve服务，wms：动态服务， wmts：静态服务

  //添加wms
  L.tileLayer.wms("http://geo.egeoscience.com.cn/geoserver/gonganxian/wms", {
    layers: "	gonganxian:gax_bj",
    format: "image/png",
    transparent: true,
    attribution: "Geoserver",
  }).addTo(cesiumMap.value);


  //添加wmts
  L.tileLayer('http://175.6.146.33:88/server/geoserver/trzjs/gwc/service/wmts?layer=zjs-IN_AD_OUTPUT&tilematrixset=EPSG:4326&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:4326:{z}&TileCol={x}&TileRow={y}', {
    tileSize: 256,
    maxZoom: 18,
    minZoom: 1,
    zoomOffset: 0,
  }).addTo(cesiumMap.value);


});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
#cesiumMap {
  height: 1000px;
  width: 1200px;
  background-color: #888;
}
</style>
