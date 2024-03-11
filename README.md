# 移动专题电子地图叙事系统

研究提出一种适应于移动专题电子地图的叙事结构，构建了“水润苏州”主题的移动端 H5 页面。

## 技术栈

Vite  +  Vue3  + Vue-Router  +  Pinia  +  Vant  +  Echarts  +  Mapbox GL JS  +  JavaScript

## 技术说明

• 使用GeoServer发布矢量切片，Maputnik软件配置样式文件， Mapbox GL JS 引擎调用样式文件实现地图渲染。
• 渲染引擎使用精灵图、按范围动态请求切片、预加载视图外的数据优化性能。
• 使用 proxy 解决跨域问题，方便切片服务的加载。
• 使用 viewport 实现移动端适配。
• 使用 pinia 实现主要事件存档，方便用户在探索完某一事件后再次查看并体验该事件。