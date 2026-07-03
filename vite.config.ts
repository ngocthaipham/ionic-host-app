import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@your-org/core',
      '@your-org/home',
      '@your-org/products',
      '@your-org/ui',
    ],
  },
  server: {
    port: 3000,
    strictPort: true,
  },
});
