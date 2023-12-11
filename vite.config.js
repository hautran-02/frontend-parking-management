/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import jsconfigPaths from 'vite-jsconfig-paths';
const path = require('path');
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    esbuild: {
      loader: 'jsx'
    },
    resolve: {
      alias: {
        '~/': path.resolve(__dirname, './src')
      }
    },
    build: {
      outDir: 'build',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        external: '/env-config.js'
      }
    },
    plugins: [
      react(),
      jsconfigPaths(),
      svgr()
    ],
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx'
        }
      }
    },
    server: {
      watch: {
        usePolling: true
      },
      host: true, // needed for the Docker Container port mapping to work
      strictPort: true,
      port: process.env.VITE_APP_PORT
    }
  };
});
