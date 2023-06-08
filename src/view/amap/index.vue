<template>
  <div id="amap_container"></div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef, ShallowRef } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import "@amap/amap-jsapi-types";
window._AMapSecurityConfig = {
  securityJsCode: "8b33d46d1353e91551cc192e23cfe2fb",
};
// amap 实例
const map: ShallowRef = shallowRef(null);
// 图层实例
const traffic: ShallowRef<AMap.TileLayer | null> = shallowRef(null);
function initMap() {
  AMapLoader.load({
    key: "7e661b8500a4024edb8220ee8faac58c",
    version: "2.0",
    plugins: ["Scale"],
  })
    .then((AMap) => {
      const mapOptions: AMap.MapOptions = {
        viewMode: "2D", //是否为2D地图模式
        zoom: 11, //初始化地图级别
        center: [106.54, 29.59], //初始化地图中心点位置
      };
      map.value = new AMap.Map("amap_container", mapOptions);
      map.value.on("complete", mapSsourceCallBack(AMap));
    })
    .catch((e) => {
      Promise.reject(e);
    });
}
/**
 * 地图加载完毕的回调
 */
function mapSsourceCallBack(AMap: any) {
  initTraffic(AMap);
  addMapControl(AMap);
  addMarker(AMap);
}

/**
 * 初始化图层
 */
function initTraffic(AMap: any) {
  /**
   * traffic.show(); //显示路况图层
   * traffic.hide(); //隐藏路况图层
   */
  traffic.value = new AMap.TileLayer.Traffic({
    autoRefresh: true, //是否自动刷新，默认为false
    interval: 180, //刷新间隔，默认180s
  });

  map.value.add(traffic.value);
}

/**
 * 添加地图控件
 */
function addMapControl(AMap: any) {
  AMap.plugin(["AMap.ToolBar", "AMap.Scale"], () => {
    map.value.addControl(new AMap.ToolBar());
    map.value.addControl(new AMap.Scale());
  });
}

/**
 * 添加地图点标记
 */
function addMarker(AMap: Window["AMap"]) {
  // 创建一个 Marker 实例：
  const marker: AMap.Marker = new AMap.Marker({
    position: new AMap.LngLat(106.54, 29.59), // 经纬度对象，也可以是经纬度构成的一维数组[106.54, 29.59]
    title: "重庆",
  });

  /**
   * 自定义图标 URL
   */
  const customMarkerOption1: AMap.MarkerOptions = {
    position: new AMap.LngLat(106.44, 29.69),
    offset: new AMap.Pixel(-10, -10),
    icon: "//vdata.amap.com/icons/b18/1/2.png", // 添加 Icon 图标 URL
    title: "重庆",
  };
  const customMarker1: AMap.Marker = new AMap.Marker(customMarkerOption1);

  /**
   * Icon 实例
   */
  // 创建 AMap.Icon 实例：
  const icon = new AMap.Icon({
    // 图标尺寸
    size: new AMap.Size(25, 34),
    // 图标的取图地址
    image: "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
    // 图标所用图片大小
    imageSize: new AMap.Size(135, 40),
    // 图标取图偏移量
    imageOffset: new AMap.Pixel(-9, -3),
  });
  const customMarkerOption2: AMap.MarkerOptions = {
    position: new AMap.LngLat(106.42, 29.67),
    offset: new AMap.Pixel(-10, -10),
    icon: icon, // 添加 Icon 实例
    title: "重庆",
  };
  const customMarker2: AMap.Marker = new AMap.Marker(customMarkerOption2);
  /**
   * 对于更加复杂的 marker 展示，我们可以使用 Marker类 的content 属性,content 属性取值为用户自定义的 DOM 节点或者 DOM 节点的HTML 片段。
   */
  const markerList = [marker, customMarker1, customMarker2];
  markerList.forEach((item) => {
    item.on("click", (e) => {
      console.log(e);
    });
  });

  map.value.add(markerList);
}

onMounted(() => {
  initMap();
});
</script>

<style lang="scss" scoped>
#amap_container {
  height: 100%;
  width: 100%;
}
</style>
