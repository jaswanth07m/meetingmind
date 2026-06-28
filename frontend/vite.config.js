import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/health': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => '/health',
      },
      '/api/upload': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => '/upload',
      },
      '/api/transcribe': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => '/transcribe',
      },
      '/api/analyze': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => '/analyze',
      },
    },
  },
})