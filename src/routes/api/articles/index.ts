import type { RequestContext } from 'solid-start/server/types'

import { getWrapper, postWrapper } from '~/utils/fetcher'

export const get = async (ctx: RequestContext) => {
  return getWrapper(ctx)
}

export const post = async (ctx: RequestContext) => {
  return postWrapper(ctx)
}
