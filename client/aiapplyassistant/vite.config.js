import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'
import path from "path"

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: Infinity,},
    server: {
      host: 'localhost',
      port: 3000
    },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
