import type { ApiFetchEvent } from 'solid-start/api/types'

import { getWrapper } from '~/utils/fetcher'

export const get = async (event: ApiFetchEvent) => {
  return getWrapper(event)
}
