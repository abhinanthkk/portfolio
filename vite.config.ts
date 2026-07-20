import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { spawn } from 'child_process';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-server',
      configureServer(server) {
        const proc = spawn('node', ['scripts/dev.js'], {
          stdio: 'inherit',
          env: { ...process.env },
        });
        server.httpServer?.on('close', () => {
          proc.kill();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion'],
        },
      },
    },
  },
});
