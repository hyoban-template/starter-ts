import { writeFileSync } from 'node:fs'
import path from 'node:path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, './src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    minify: false,
  },
  plugins: [dts({
    include: ['./src/index.ts'],
    beforeWriteFile: (filePath, content) => {
      writeFileSync(filePath.replace('.d.ts', '.d.cts'), content)
      return { filePath, content }
    },
  })],
})
