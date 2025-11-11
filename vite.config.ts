import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // 将大型依赖库分离到单独的chunk中
          if (id.includes('node_modules')) {
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom')
            ) {
              return 'react-vendor';
            }
            if (id.includes('antd') || id.includes('@ant-design/icons')) {
              return 'ui-vendor';
            }
            if (id.includes('echarts') || id.includes('recharts')) {
              return 'chart-vendor';
            }
            if (id.includes('@supabase') || id.includes('xlsx')) {
              return 'data-vendor';
            }
            if (id.includes('date-fns') || id.includes('uuid')) {
              return 'util-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            if (id.includes('sweetalert2')) {
              return 'alert-vendor';
            }
            if (id.includes('zustand')) {
              return 'state-vendor';
            }
            if (id.includes('@heroicons') || id.includes('lucide-react')) {
              return 'icon-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'radix-vendor';
            }
          }
        },
      },
    },
  },
});
