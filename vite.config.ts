import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

const BLOG_API_TARGET = 'https://aihosthub.aihnet.com'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    vueJsx(),
    ...(command === 'serve' ? [vueDevTools()] : []),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: BLOG_API_TARGET,
        changeOrigin: true,
        secure: true,
      },
      '/health': {
        target: BLOG_API_TARGET,
        changeOrigin: true,
        secure: true,
      },
    },
  },
}))
