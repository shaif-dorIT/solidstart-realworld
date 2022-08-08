import type { ApiFetchEvent } from 'solid-start/api/types'

import { postWrapper } from '~/utils/fetcher'

export const post = async (event: ApiFetchEvent) => {
  return postWrapper(event)
}
