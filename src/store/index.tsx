import { isServer } from 'solid-js/web'
import { createStore } from 'solid-js/store'
import { createContext, createEffect, useContext } from 'solid-js'

import createAuth from './createAuth'
import createAgent from './createAgent'
import createCommon from './createCommon'
import createProfile from './createProfile'
import createArticles from './createArticles'
import createComments from './createComments'

import type { Actions, Children, State } from '~/types'

const StoreContext = createContext<[State, Actions]>()

export function Provider(props: { children: Children }) {
  // eslint-disable-next-line prefer-const
  let articles, comments, tags, profile, currentUser
  const extractToken = () => {
    if (isServer) return undefined
    return localStorage.getItem('jwt') ?? undefined
  }

  const [state, setState] = createStore({
    get articles() {
      return articles()
    },
    get comments() {
      return comments()
    },
    get tags() {
      return tags()
    },
    get profile() {
      return profile()
    },
    get currentUser() {
      return currentUser()
    },
    page: 0,
    totalPagesCount: 0,
    token: extractToken(),
    appName: 'conduit',
    articleSlug: ''
  })
  const actions = {}
  const store: [State, Actions] = [state, actions]
  const agent = createAgent(store)

  articles = createArticles(agent, actions, state, setState)
  comments = createComments(agent, actions, state, setState)
  tags = createCommon(agent, actions, state, setState)
  profile = createProfile(agent, actions, state, setState)
  currentUser = createAuth(agent, actions, setState)

  createEffect(() => {
    if (state.token) (actions as Actions).pullUser()
  })

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
