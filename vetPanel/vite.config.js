// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // 👈 This line is crucial for routing to work on Render
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  }
})
