import type { ApiFetchEvent } from 'solid-start/api/types'

import { delWrapper } from '~/utils/fetcher'

export const del = async (event: ApiFetchEvent) => {
  return delWrapper(event)
}
