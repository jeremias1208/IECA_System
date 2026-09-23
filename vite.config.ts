import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Necessário para o GitHub Pages
  base: '/IECA_System/',

  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});