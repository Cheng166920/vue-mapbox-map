import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
// 将 px 转换为 vw
import postcsspxtoviewport from "postcss-px-to-viewport"
// https://vitejs.dev/config/


export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: false,
      // 原因：Toast Confirm 这类组件的样式还是需要单独引入，样式全局引入了，关闭自动引入
      resolvers: [VantResolver({ importStyle: false })]
    }),
    vueSetupExtend({
      enableAutoExpose: true
    })
  ],
  css: {
    postcss: {
      plugins: [
       
        postcsspxtoviewport({
          // 要转化的单位
          unitToConvert: 'px',
          // UI设计稿的大小
          viewportWidth: 750,
          // 转换后的精度
          unitPrecision: 6,
          // 转换后的单位
          viewportUnit: 'vw',
          // 字条转换后的单位
          fontViewportUnit: 'vw',
          // 能转换的属性，*表示所有属性，!border表示border不转
          propList: ['*'],
          // 指定不转换为视窗单位的类名，
          selectorBlackList: ['ignore-'],
          // 最小转换的值，小于等于1不转
          minPixelValue: 1,
          // 是否在媒体查询的css代码中也进行转换，默认false
          mediaQuery: false,
          // 是否转换后直接更换属性值
          replace: true,
          // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          exclude: [],
          // 包含那些文件或者特定文件
          include: [],
          // 是否处理横屏情况
          landscape: false
        }),
      ]
    }
  },
  server: {
    port: 4000, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
    proxy: {
        '/geoserver': {
            target: 'http://localhost:8080', //接口域名
            changeOrigin: true,             //是否跨域
            ws: true,                       //是否代理 websockets
            secure: true,                   //是否https接口
            pathRewrite: {                  //路径重置
                '^/geoserver': ''
            }
        }
    }
  }
})
