import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/themes': 'http://localhost:8080',
      '/times': 'http://localhost:8080',
      '/reservations': 'http://localhost:8080',
    },
  },
});
