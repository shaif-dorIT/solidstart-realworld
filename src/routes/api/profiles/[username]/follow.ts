import type { ApiFetchEvent } from 'solid-start/api/types'

import { delWrapper, postWrapper } from '~/utils/fetcher'

export const post = async (event: ApiFetchEvent) => {
  return postWrapper(event)
}

export const del = async (event: ApiFetchEvent) => {
  return delWrapper(event)
}
