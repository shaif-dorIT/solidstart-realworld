/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite'

import solid from 'solid-start/vite'

export default defineConfig({
  plugins: [
    solid({
      ssr: true
    })
  ],
  build: {
    target: 'esnext',
    polyfillModulePreload: false
  },
  resolve: {
    conditions: ['development', 'browser']
  }
})
