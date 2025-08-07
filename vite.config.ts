import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
  ],
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.webp'],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // React and related
          'react-vendor': ['react', 'react-dom'],
          // Large UI libraries
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-toast',
            '@radix-ui/react-tabs',
            '@radix-ui/react-accordion',
            '@radix-ui/react-navigation-menu'
          ],
          // Calendar and date libraries
          'calendar-vendor': [
            'react-big-calendar',
            'react-calendar', 
            'date-fns',
            'react-day-picker'
          ],
          // Charts and visualization
          'chart-vendor': ['recharts'],
          // Icons and animations
          'visual-vendor': ['lucide-react', 'react-icons', 'framer-motion'],
          // Utility libraries
          'utils-vendor': ['clsx', 'class-variance-authority', 'tailwind-merge'],
          // Form and validation
          'form-vendor': ['react-hook-form', 'zod'],
          // Query and state management
          'query-vendor': ['@tanstack/react-query']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['@sinclair/typebox'],
    esbuildOptions: {
      target: 'es2020',
      supported: {
        'top-level-await': true
      }
    }
  },
  server: {
    fs: {
      strict: false,
      allow: ['..', 'node_modules']
    },
    proxy: {
      '/api': 'http://localhost:3001',
    }
  }
});
