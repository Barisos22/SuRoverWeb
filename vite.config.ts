import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Uncomment and update with your GitHub repo name for GitHub Pages deployment
  base: '/SuRoverWeb/',
})
