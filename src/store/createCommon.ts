import { createEffect, createResource } from 'solid-js'
import type { SetStoreFunction } from 'solid-js/store'
import { Actions, Agent, State } from '~/types'

export default function createCommon(
  agent: Agent,
  actions: Actions,
  state: State,
  setState: SetStoreFunction<State>
) {
  const [tags] = createResource<string[], string>(
    'tags',
    async () => {
      const resp = await agent.Tags.getAll()
      if (resp.errors) throw resp.errors

      return resp.tags
    },
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
