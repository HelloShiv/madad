import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.BACKEND_URL': JSON.stringify(
      process.env.BACKEND_URL || 'http://localhost:8000',
    ),
    'process.env.FRONTEND': JSON.stringify(
      process.env.FRONTEND_URL || 'http://0xmadad.vercel.app.vite',
    ),
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
