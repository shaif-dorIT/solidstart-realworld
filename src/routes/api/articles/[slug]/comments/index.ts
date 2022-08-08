import { create, test, enforce } from 'vest'
import type { ApiFetchEvent } from 'solid-start/api/types'

import { getWrapper, postWrapper } from '~/utils/fetcher'

const suite = create((data = {}) => {
  test('body', 'Comment Body is required', () => {
    enforce(data.comment.body).isNotNull().isNotBlank().isString()
  })
})

export const get = async (event: ApiFetchEvent) => {
  return getWrapper(event)
}

export const post = async (event: ApiFetchEvent) => {
  return postWrapper(event, suite)
}
