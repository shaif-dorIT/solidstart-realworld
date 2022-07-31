import type { RequestContext } from 'solid-start/server/types'

import { delWrapper, getWrapper, putWrapper } from '~/utils/fetcher'

export const get = async (ctx: RequestContext) => {
  return getWrapper(ctx)
}

export const put = async (ctx: RequestContext) => {
  return putWrapper(ctx)
}

export const del = async (ctx: RequestContext) => {
  return delWrapper(ctx)
}
