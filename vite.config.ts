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
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.[tj]sx?$/]
    },
    setupFiles: './scripts/setup-vitest.ts',
    // solid needs to be inline to work around
    // a resolution issue in vitest:
    deps: {
      inline: [/solid-js/]
    }
    // if you have few tests, try commenting one
    // or both out to improve performance:
    // threads: false,
    // isolate: false,
<<<<<<< HEAD
  }
}

const viteConfig = defineConfig({
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
=======
>>>>>>> master
    // polyfillDynamicImport: false
    polyfillModulePreload: false
  },
  resolve: {
    conditions: ['development', 'browser']
  }
<<<<<<< HEAD
}) as UserConfig

export default viteConfig
=======
})
>>>>>>> master
