import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist', // ✅ Vercel expects this
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit to 1000 kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor_react';
            }
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    host: '0.0.0.0', // ✅ good for Render and local testing
    port: 5173,
  },
});
