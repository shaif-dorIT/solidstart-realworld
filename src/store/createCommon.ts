import { createEffect, createResource } from 'solid-js'
import type { SetStoreFunction } from 'solid-js/store'

import { Actions, State } from '~/State'
import type { Agent } from './createAgent'

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
