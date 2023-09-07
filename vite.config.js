/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        [`${process.env.VITE_KEY_URL}`]: {
          target: process.env.VITE_API_URL, // Your desired target URL
          changeOrigin: true, // Change the origin of the request
          rewrite: (path) => path.replace(/^\/BP-API/, ""), // Rewrite the URL
        },
      },
    },
  });
};
