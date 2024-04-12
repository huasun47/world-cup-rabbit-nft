import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
// vite 项目模版 https://github.com/vitejs/awesome-vite#plugins
export default defineConfig((config) => {

  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    build: {
      rollupOptions: {
        // https://rollupjs.org/guide/en/#outputmanualchunks
        output: {
          manualChunks: {
            home: [
              './src/views/home'
            ],
            login: [
              './src/views/login'
            ],
          },
        }
      },
    },
    plugins: [vue()]
  }
})
