import { createSignal, createResource } from 'solid-js'
<<<<<<< HEAD
import type { SetStoreFunction } from 'solid-js/store'

import { Actions, Agent, State } from '~/types'
=======

import { Actions, State } from '~/State'
import type { Agent } from './createAgent'
>>>>>>> master

export default function createProfile(
  agent: Agent,
  actions: Actions,
  state: State,
  setState: SetStoreFunction<State>
) {
  const [username, setUsername] = createSignal<string>()
  const [profile] = createResource(username, agent.Profile.get)
  Object.assign(actions, {
    loadProfile: setUsername,
    async follow() {
      if (state.profile && !state.profile.following) {
        setState('profile', 'following', true)
        try {
          await agent.Profile.follow(state.profile.username)
        } catch (err) {
          setState('profile', 'following', false)
        }
      }
    },
    async unfollow() {
      if (state.profile && state.profile.following) {
        setState('profile', 'following', false)
        try {
          await agent.Profile.unfollow(state.profile.username)
        } catch (err) {
          setState('profile', 'following', true)
        }
      }
    }
  })
  return profile
}
