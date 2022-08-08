import type { ApiFetchEvent } from 'solid-start/api/types'

import { getWrapper, postWrapper } from '~/utils/fetcher'

export const get = async (event: ApiFetchEvent) => {
  return getWrapper(event)
}

export const post = async (event: ApiFetchEvent) => {
  return postWrapper(event)
}
