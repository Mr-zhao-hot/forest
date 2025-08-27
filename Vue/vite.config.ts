import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  const isElectron = process.env.ELECTRON === 'true'

  return {
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
        '&': fileURLToPath(new URL('./public', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/utils.scss" as *;`,
        },
        less: {
          math: 'always',
          javascriptEnabled: true,
          modifyVars: {},
        },
      },
    },
    base: isElectron ? './' : '/',
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: false,
      open: !isElectron,
      proxy: {
        '/api': {
          target: 'http://172.16.202.185:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
        }
      },
      hmr: {
        overlay: true
      }
    },
    preview: {
      host: '0.0.0.0',
      port: 4173
    },
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: ['**/cypress/**'],
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'json', 'html'],
      },
    },
    build: {
      outDir: isElectron ? 'dist-electron/web' : 'dist',
      assetsDir: isElectron ? '.' : 'assets',
      sourcemap: true,
      chunkSizeWarningLimit: 1500,
      rollupOptions: isElectron ? {
        output: {
          format: 'es',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      } : undefined
    }
  }
})
