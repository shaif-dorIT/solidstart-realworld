import type { ApiFetchEvent } from 'solid-start/api/types'

import { getWrapper, putWrapper } from '~/utils/fetcher'

export const get = async (event: ApiFetchEvent) => {
  return getWrapper(event)
}

export const put = async (event: ApiFetchEvent) => {
  return putWrapper(event)
}
