import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  build: {
    assetsInlineLimit: 0, // 音声ファイルをインライン化せず、個別ファイルとしてコピー
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // 音声ファイルを assets/audio/ ディレクトリに配置
          if (assetInfo.name && /\.(mp3|wav|ogg|m4a)$/.test(assetInfo.name)) {
            return "assets/audio/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  assetsInclude: ["**/*.mp3", "**/*.wav", "**/*.ogg", "**/*.m4a"],
});
