import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [react()],
      publicDir: false,
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'ReactSmartTable',
          formats: ['es'],
          fileName: () => 'react-smart-table.js',
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          output: {
            assetFileNames: (assetInfo) => {
              if (assetInfo.names?.some((name) => name.endsWith('.css'))) {
                return 'styles.css'
              }

              return 'assets/[name][extname]'
            },
          },
        },
        cssCodeSplit: false,
        emptyOutDir: true,
      },
    }
  }

  return {
    plugins: [react()],
    root: '.',
    server: {
      port: 3000,
      open: true,
    },
  }
})
