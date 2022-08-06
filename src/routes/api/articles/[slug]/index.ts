import type { ApiFetchEvent } from 'solid-start/api/types'

import { delWrapper, getWrapper, putWrapper } from '~/utils/fetcher'

export const get = async (event: ApiFetchEvent) => {
  return getWrapper(event)
}

export const put = async (event: ApiFetchEvent) => {
  return putWrapper(event)
}

export const del = async (event: ApiFetchEvent) => {
  return delWrapper(event)
}
