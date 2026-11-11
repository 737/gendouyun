import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // 全局注入变量，等价于每个样式文件都 @use 一次 variables.scss
        additionalData: '@use "variables" as *;',
        loadPaths: [fileURLToPath(new URL('./src/styles', import.meta.url))],
      },
    },
  },
  build: {
    // 产物输出到项目根目录的 dist，交给 koa-static-cache 托管
    outDir: fileURLToPath(new URL('../dist', import.meta.url)),
    assetsDir: 'assets',
    emptyOutDir: true,
  },
})
