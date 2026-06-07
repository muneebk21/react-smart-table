import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // Use current directory as root (where index.html is)
  server: {
    port: 3000,
    open: true, // Automatically open browser
  },
})