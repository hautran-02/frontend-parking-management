/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      ".runtimeConfig": "./runtimeConfig.browser",
      "~": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
})
