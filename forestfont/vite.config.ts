import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { fileURLToPath, URL } from 'node:url';
import { configDefaults } from 'vitest/config';
import VueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less',
          resolveIcons: true,
        }),
      ],
      dts: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '&': fileURLToPath(new URL('./pubilc', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "@/assets/scss/_variables.scss" as vars;`,
      },
      less: {
        javascriptEnabled: true,
        modifyVars: {},
      },
    },
  },
  // server: {
  //   host: '0.0.0.0',       // 允许局域网访问
  //   port: 5173,            // 开发服务器端口
  //   strictPort: true,      // 如果端口被占用直接报错
  //   open: true,            // 自动打开浏览器
  //   proxy: {               // API代理配置
  //     '/api': {
  //       target: 'http://192.168.251.53:8080',  // 后端API地址
  //       changeOrigin: true,               // 允许跨域
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       secure: false,                    // 如果是https需要设为true
  //     }
  //   },
  //   hmr: {                 // 热模块替换配置
  //     overlay: true        // 编译错误时显示浏览器覆盖层
  //   }
  // },
  preview: {              // 预览模式配置
    host: '0.0.0.0',
    port: 4173
  },
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, '**/cypress/**'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
  },
  build: {
    outDir: 'dist',       // 打包输出目录
    assetsDir: 'assets',  // 静态资源目录
    sourcemap: true,      // 生成sourcemap
    chunkSizeWarningLimit: 1500, // 分块大小警告限制(kb)
  }
});
