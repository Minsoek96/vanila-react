import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "@/libs/jsx",
    jsxFragment: "Fragment",
    jsxDev: false,
    jsxFactory: 'jsx',
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
