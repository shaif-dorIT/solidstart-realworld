<<<<<<< HEAD
import { createStore } from 'solid-js/store'
import { createContext, useContext } from 'solid-js'
=======
/* eslint-disable prefer-const */
import { createStore } from 'solid-js/store'
import { createContext, createEffect, Resource, useContext } from 'solid-js'
>>>>>>> master
import { isServer } from 'solid-js/web'

import createAuth from './createAuth'
import createAgent from './createAgent'
import createCommon from './createCommon'
import createProfile from './createProfile'
import createArticles from './createArticles'
import createComments from './createComments'

<<<<<<< HEAD
import type { Actions, Children, State } from '~/types'
=======
import type { Article, Actions, Comment, State, User } from '~/types'
import { Children } from '~/Children'
>>>>>>> master

const StoreContext = createContext<[State, Actions]>()

export function Provider(props: { children: Children }) {
<<<<<<< HEAD
  let articles, comments, tags, profile, currentUser
=======
  let articles: Resource<{
      [slug: string]: Article
    }>,
    comments: Resource<Comment[]>,
    tags: Resource<string[]>,
    profile,
    currentUser: Resource<User>

>>>>>>> master
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

<<<<<<< HEAD
  if (state.token) (actions as Actions).pullUser()
=======
  createEffect(() => {
    if (state.token) (actions as Actions).pullUser()
  })
>>>>>>> master

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
