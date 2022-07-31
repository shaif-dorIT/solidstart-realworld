import type { SetStoreFunction } from 'solid-js/store'
import { createSignal, createResource, batch } from 'solid-js'

<<<<<<< HEAD
import type { Actions, Agent, State, User } from '~/types'
=======
import type { Agent } from './createAgent'
import type { User } from '~/types'
import { Actions, State } from '~/State'
>>>>>>> master

export default function createAuth(
  agent: Agent,
  actions: Actions,
  setState: SetStoreFunction<State>
) {
  const [loggedIn, setLoggedIn] = createSignal(false),
    [currentUser, { mutate }] = createResource<User, true>(
      loggedIn,
      agent.Auth.current
    )
  Object.assign(actions, {
    pullUser: () => setLoggedIn(true),
    async login(email: string, password: string) {
      const { user, errors } = await agent.Auth.login(email, password)
      if (errors) throw errors
      actions.setToken(user.token)
      setLoggedIn(true)
    },
    async register(username: string, email: string, password: string) {
      const { user, errors } = await agent.Auth.register(
        username,
        email,
        password
      )
      if (errors) throw errors
      actions.setToken(user.token)
      setLoggedIn(true)
    },
    logout() {
      batch(() => {
        setState({ token: undefined })
        mutate(undefined)
        setLoggedIn(false)
      })
    },
    async updateUser(newUser: User) {
      const resp = await agent.Auth.save(newUser)
      if (resp.errors) throw resp.errors
      mutate(resp.user)
    }
  })
  return currentUser
}
