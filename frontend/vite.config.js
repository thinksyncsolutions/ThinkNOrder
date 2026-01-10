import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(),],
//    define: {
//     'process.env': process.env
//   }
// })

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // 👈 allow access from mobile / tunnel
    port: 5173,
      allowedHosts: ['*']
  }
})

