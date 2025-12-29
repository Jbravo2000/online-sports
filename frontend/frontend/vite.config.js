import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/online-sports/', // Ajusta esto al nombre de tu repositorio
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})