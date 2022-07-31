<<<<<<< HEAD
// vite.config.ts
import { defineConfig } from 'vite'
import solid from 'solid-start'
var vitestConfig = {
=======
/// <reference types="vitest" />
<<<<<<< HEAD
import { defineConfig } from 'vite'
import solid from 'solid-start'

import type { UserConfig } from 'vitest/config'
=======
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import solid from 'solid-start'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
>>>>>>> master

export default defineConfig({
>>>>>>> 4af4b2cfbde519398a69976e4cbf0b831d966671
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
<<<<<<< HEAD
=======
    // if you have few tests, try commenting one
    // or both out to improve performance:
    // threads: false,
    // isolate: false,
<<<<<<< HEAD
>>>>>>> 4af4b2cfbde519398a69976e4cbf0b831d966671
  }
}
var viteConfig = defineConfig({
  test: vitestConfig.test,
  plugins: [
=======
  },
  plugins: [
    viteCommonjs(),
>>>>>>> master
    solid({
      ssr: true
    })
  ],
  build: {
    target: 'esnext',
<<<<<<< HEAD
    polyfillModulePreload: false
<<<<<<< HEAD
=======
=======
>>>>>>> master
    // polyfillDynamicImport: false
    polyfillModulePreload: false
>>>>>>> 4af4b2cfbde519398a69976e4cbf0b831d966671
  },
  resolve: {
    conditions: ['development', 'browser']
  }
<<<<<<< HEAD
})
var vite_config_default = viteConfig
export { vite_config_default as default }
=======
<<<<<<< HEAD
}) as UserConfig

export default viteConfig
=======
})
>>>>>>> master
>>>>>>> 4af4b2cfbde519398a69976e4cbf0b831d966671
