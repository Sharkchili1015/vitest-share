/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    // 模拟dom环境
    environment: "happy-dom",
    coverage: {
      provider: "istanbul", // or 'c8'
    },
  },
});
