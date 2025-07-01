// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are correctly resolved in production
  build: {
    outDir: 'dist', // Vercel default output directory
    sourcemap: false, // Set to true if you want source maps for debugging
    rollupOptions: {
      output: {
        // Optional: simple vendor chunking (not splitting React separately)
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});
