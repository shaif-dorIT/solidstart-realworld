import { createEffect, createSignal, Show } from 'solid-js'

import { useStore } from '~/store'
import type { Children } from '~/types'
import NavBar from '~/components/NavBar/NavBar'

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
      <header>
        <NavBar />
      </header>
      <main>{props.children}</main>
      <footer class=''>
        <div class='container'>
          <a
            href='/'
            class='ember-view logo-font'
          >
            conduit
          </a>
          <span class='attribution'>
            An interactive learning project from{' '}
            <a href='https://realworld-docs.netlify.app/'>RealWorld</a>. Code
            &amp; design licensed under MIT.
          </span>
        </div>
      </footer>
    </Show>
  )
}
