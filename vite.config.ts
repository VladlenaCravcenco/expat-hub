import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Plugin to resolve figma:asset/ imports when running locally
// In Figma Make these are handled natively; locally we return a placeholder
const figmaAssetPlugin = {
  name: 'figma-asset-resolver',
  resolveId(id: string) {
    if (id.startsWith('figma:asset/')) {
      return '\0' + id;
    }
  },
  load(id: string) {
    if (id.startsWith('\0figma:asset/')) {
      const placeholder =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
      return `export default "${placeholder}";`;
    }
  },
};

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    figmaAssetPlugin,
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})