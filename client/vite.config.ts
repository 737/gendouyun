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
    // Node 24 + 现代浏览器，不必为 ES5 语法付出体积代价
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // 框架代码单独成块：业务代码改动时用户不用重新下载 vue 运行时，
        // 两者也能并行下载（产物文件名带哈希，服务端已配 immutable 长缓存）
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
