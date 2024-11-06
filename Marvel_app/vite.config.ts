import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_PUBLIC_KEY': JSON.stringify(process.env.VITE_PUBLIC_KEY),
    'process.env.VITE_PRIVATE_KEY': JSON.stringify(process.env.VITE_PRIVATE_KEY)
  }
})
