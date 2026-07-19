import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

const reactCompiler = babel({ presets: [reactCompilerPreset({ target: '18' })] })

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [react(), reactCompiler],
      publicDir: false,
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'ReactSmartTable',
          formats: ['es'],
          fileName: () => 'react-smart-table.js',
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime', 'react-compiler-runtime'],
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
    plugins: [react(), reactCompiler],
    root: '.',
    server: {
      port: 3000,
      open: true,
    },
  }
})
