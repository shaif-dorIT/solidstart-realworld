// vite.config.ts
import { defineConfig } from 'vite'
import solid from 'solid-start'
var vitestConfig = {
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
  }
}
var viteConfig = defineConfig({
  test: vitestConfig.test,
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
var vite_config_default = viteConfig
export { vite_config_default as default }
