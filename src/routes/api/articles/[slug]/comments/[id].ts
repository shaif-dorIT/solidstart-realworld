import type { RequestContext } from 'solid-start/server/types'
import { delWrapper } from '~/utils/fetcher'

export const del = async (ctx: RequestContext) => {
  return delWrapper(ctx)
}
