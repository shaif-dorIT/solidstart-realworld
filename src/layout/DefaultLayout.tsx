import { createEffect, createSignal, Show } from 'solid-js'

import { useStore } from '~/store'
import { Footer } from './Footer'
import { Header } from './Header'
import type { Children } from '~/types'

import './defaultLayout.css'

export default function DefaultLayout(props: { children: Children }) {
  const [ready, setReady] = createSignal(false)
  const showApp = () => !!useStore()

  createEffect(() => setReady(showApp() !== undefined))

  return (
    <Show
      when={ready()}
      fallback={<div>Loading...</div>}
    >
      <Header />
      <main>{props.children}</main>
      <Footer />
    </Show>
  )
}
