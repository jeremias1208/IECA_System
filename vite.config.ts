import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  base: '/IECA_System/',

  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});