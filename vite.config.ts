import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
        chunkFileNames: 'static/js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'static/js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
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
