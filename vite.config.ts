/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite'

import solid from 'solid-start'

const viteConfig = defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.[tj]sx?$/]
    },
    setupFiles: './scripts/setup-vitest.ts',
    deps: {
      inline: [/solid-js/]
    }
  },
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
export default viteConfig
