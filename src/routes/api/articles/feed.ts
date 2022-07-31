import type { RequestContext } from 'solid-start/server/types'

import { getWrapper } from '~/utils/fetcher'

export const get = async (ctx: RequestContext) => {
  return getWrapper(ctx)
}
