import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
   plugins: [react()],
   server: {
      watch: {
         usePolling: true
      },
      host: true,
      strictPort: true,
      port: 4000
   },
   define: {
      global: 'globalThis'
   },
   optimizeDeps: {
      exclude: ['js-big-decimal']
   }

})
