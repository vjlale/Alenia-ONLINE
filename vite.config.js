import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            // Otros vendor
            return 'vendor-other';
          }
          // Chunks por funcionalidad
          if (id.includes('/pages/')) {
            if (id.includes('Home') || id.includes('Contact') || id.includes('NotFound')) {
              return 'pages-core';
            }
            if (id.includes('Services') || id.includes('SolucionLevels') || id.includes('ServiceDetail')) {
              return 'pages-services';
            }
            if (id.includes('Blog')) {
              return 'pages-blog';
            }
            if (id.includes('Apps')) {
              return 'pages-apps';
            }
          }
          if (id.includes('/components/apps/')) {
            return 'components-apps';
          }
          if (id.includes('/components/common/')) {
            return 'components-common';
          }
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    },
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    copyPublicDir: true,
    cssCodeSplit: true,
    reportCompressedSize: false
  },
  server: {
    port: 3001,
    host: true
  },
  preview: {
    port: 3002,
    host: true
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'recharts',
      'framer-motion'
    ]
  }
})