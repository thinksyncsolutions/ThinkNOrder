import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "./",   // ✅ VERY IMPORTANT to ensure correct asset paths in production
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      ".trycloudflare.com", // ✅ allow all cloudflare tunnel subdomains
    ],
  },
})
