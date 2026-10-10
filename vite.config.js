import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SANDBOX=1 задаётся только в облачном предпросмотре, локально не нужен
const sandbox = !!process.env.SANDBOX

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
    hmr: sandbox ? { clientPort: 443 } : undefined,
  },
  preview: { host: '0.0.0.0', port: 4173, allowedHosts: true },
})
