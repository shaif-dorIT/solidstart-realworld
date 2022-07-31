import { createEffect, createResource } from 'solid-js'
import type { SetStoreFunction } from 'solid-js/store'
<<<<<<< HEAD
import { Actions, Agent, State } from '~/types'

=======

import { Actions, State } from '~/State'
import type { Agent } from './createAgent'

>>>>>>> master
export default function createCommon(
  agent: Agent,
  actions: Actions,
  state: State,
  setState: SetStoreFunction<State>
) {
  const [tags] = createResource<string[], string>(
    'tags',
    () => agent.Tags.getAll(), //.then((receivedTags) => receivedTags.map((tag) => tag.toLowerCase())),
    { initialValue: [] }
  )
  createEffect(() => {
    state.token
      ? localStorage.setItem('jwt', state.token)
      : localStorage.removeItem('jwt')
  })
  actions.setToken = (token: string) => setState({ token })
  return tags
}
