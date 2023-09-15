import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      port: 4000,
      proxy: {
        "/api": {
          target: process.env.VITE_APP_API_URL,
          changeOrigin: true,
          ws: true,
        },
      },
    },
    plugins: [vue()],
  });
};
