// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), visualizer({ open: true })],
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

// To analyze your bundle, run: npm run build
// After build, a stats.html file will open showing bundle composition
