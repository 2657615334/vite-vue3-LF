import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('src'), // @代替src
      '#': path.resolve('types'), // #代替types
    },
  },
  build: {
    reportCompressedSize: false,
    sourcemap: false,
    rollupOptions: {
      // vite打包是通过rollup来打包的
      output: {
        manualChunks: (id: string) => {
          // 可以在这里打印看一下id的值，这里做个简单处理将node_modules中的包打包为vendor文件
          if (id.indexOf('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/css/index.scss";',
      },
    },
  },
  server: {
    port: 5000,
    open: true,
    host: '0.0.0.0',
    https: false,
    // proxy: {
    //   '/api/': {
    //     target: 'http://139.155.97.251:8500/',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
})
