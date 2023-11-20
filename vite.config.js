/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import jsconfigPaths from 'vite-jsconfig-paths';
const path = require("path");
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  esbuild: {
    loader: "jsx",
  },
  resolve: {
    alias: [{ find: "~", replacement: path.resolve(__dirname, "./src") }],
  },
  plugins: [react(), jsconfigPaths(), svgr()],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
