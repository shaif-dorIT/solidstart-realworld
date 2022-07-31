import type { RequestContext } from 'solid-start/server/types'

import { postWrapper } from '~/utils/fetcher'

export const post = async (ctx: RequestContext) => {
  return postWrapper(ctx)
}
