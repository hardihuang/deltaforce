import path from 'path'
import { defineConfig } from '@lark-apaas/coding-vite-preset'

export default defineConfig({
  root: path.resolve(__dirname, 'client'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
})
