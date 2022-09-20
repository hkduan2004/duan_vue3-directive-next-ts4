import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression'
import path from 'path';

const { resolve } = path;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    })
  ],
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/index.scss";`
      }
    }
  },
  //启动服务配置
  server: {
    host: 'localhost',
    port: 8080,
    open: true,
    https: false,
    // 代理配置
    proxy: {}
  },
  // 生产环境打包配置
  //去除 console debugger
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/directives/index.ts'),
      name: 'directive',
      formats: ['es','cjs','umd'],
      fileName: (format) => `v-directive.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  }
})
