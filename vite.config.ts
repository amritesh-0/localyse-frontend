import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist', // ✅ Vercel expects this
  },
  server: {
    host: '0.0.0.0', // ✅ good for Render and local testing
    port: 5173,
  },
});
