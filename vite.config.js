import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
import { resolve } from 'path' // 主要用于alias文件路径别名
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.', 'src'),
      'components': resolve(__dirname, '.', 'src/components'),
      'views': resolve(__dirname, '.', 'src/views'),
      'store': resolve(__dirname, '.', 'src/store'),
      'utils': resolve(__dirname, '.', 'src/utils'),
    },
  },
  outDir: 'dist'
})
