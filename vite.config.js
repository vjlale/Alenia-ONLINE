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
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'motion': ['framer-motion'],
          'icons': ['lucide-react'],
          'charts': ['recharts'],
          // Separar componentes lazy en chunks específicos
          'pages-core': ['./src/pages/Home', './src/pages/Contact', './src/pages/NotFound'],
          'pages-services': ['./src/pages/Services', './src/pages/SolucionLevels', './src/pages/ServiceDetail'],
          'pages-blog': ['./src/pages/Blog', './src/pages/BlogPostPage'],
          'pages-apps': ['./src/pages/Apps'],
          'components-apps': [
            './src/components/apps/ROICalculator',
            './src/components/apps/CompetitorAnalyzer',
            './src/components/apps/HashtagGenerator',
            './src/components/apps/AutomationSimulator'
          ]
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    },
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    copyPublicDir: true
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