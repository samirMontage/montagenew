// Сборка сайта в ОДИН html-файл (для предпросмотра без сервера).
// Для Netlify используется обычный vite.config.js – этот файл его не затрагивает.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { outDir: 'dist-single', assetsInlineLimit: 100_000_000, cssCodeSplit: false },
})
