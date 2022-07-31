import type { RequestContext } from 'solid-start/server/types'

import { delWrapper, postWrapper } from '~/utils/fetcher'

export const post = async (ctx: RequestContext) => {
  return postWrapper(ctx)
}

export const del = async (ctx: RequestContext) => {
  return delWrapper(ctx)
}
