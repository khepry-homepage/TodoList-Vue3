import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
import { resolve } from 'path' // 主要用于alias文件路径别名
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, '.', 'src'),
      'components': resolve(__dirname, '.', 'src/components'),
      'views': resolve(__dirname, '.', 'src/views'),
      'store': resolve(__dirname, '.', 'src/store'),
      'api': resolve(__dirname, '.', 'src/api'),
      'utils': resolve(__dirname, '.', 'src/utils'),
      'router': resolve(__dirname, '.', 'src/router'),
    },
  },
  server: {
    host: '0.0.0.0',
    // proxy: {
    //   // 选项写法
    //   '/api': {
    //     target: 'http://106.15.177.150:8080',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   },
    // }
  },
})
