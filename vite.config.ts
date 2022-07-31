/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite'

import solid from 'solid-start'

export default defineConfig({
  plugins: [solid()],
  build: {
    target: 'esnext',
    polyfillModulePreload: false
  },
  resolve: {
    conditions: ['development', 'browser']
  }
})
