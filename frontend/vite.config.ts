import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path" // ✅ Correct for ESM/modern Vite setup

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
})
