import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  resolve: {
    alias: {

      // components
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@layout': path.resolve(__dirname, './src/components/layout'),
      '@shared': path.resolve(__dirname, './src/components/shared'),

      // api
      '@api': path.resolve(__dirname, './src/api'),

      // constants
      '@constants': path.resolve(__dirname, './src/constants'),

      // hooks
      '@hooks': path.resolve(__dirname, './src/hooks'),

      // pages
      '@pages': path.resolve(__dirname, './src/pages'),

      // store
      '@store': path.resolve(__dirname, './src/store'),

      // utils
      '@utils': path.resolve(__dirname, './src/utils'),

      //schems for zod
      '@schemas': path.resolve(__dirname, './src/schemas'),

      //config
      '@config': path.resolve(__dirname, './src/config'),

      //routes
      '@routes': path.resolve(__dirname, './src/routes'),

      // assets
      '@images': path.resolve(__dirname, './src/assets/images'),
    }
  },

  css: {
    modules: {
      generateScopedName:
        mode === 'development'
          ? '[name]__[local]__[hash:base64:5]'
          : '[hash:base64:6]',
    },
  },

  server: {
    host: true,
    port: 5174,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: 'http://kinetic-api:5000',
        changeOrigin: true,
      }
    }
  }
}))