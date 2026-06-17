import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// シンプルな設定。MVPはフロントエンドのみ。
// GitHub Pages公開用：相対パス＋docsフォルダ出力（Pagesのsource=main /docs）
export default defineConfig({
  base: "./",
  build: { outDir: "docs" },
  plugins: [react()],
});
