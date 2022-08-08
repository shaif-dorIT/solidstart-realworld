import { create, test, enforce } from 'vest'
import type { ApiFetchEvent } from 'solid-start/api/types'

import { getWrapper, postWrapper } from '~/utils/fetcher'

const suite = create((data = {}) => {
  test('title', 'Article Title is required', () => {
    enforce(data.article.title).isNotNull().isNotBlank().isString()
  })
  test('description', 'Article description is required', () => {
    enforce(data.article.description).isNotNull().isNotBlank().isString()
  })
  test('body', 'Article Body is required', () => {
    enforce(data.article.body).isNotNull().isNotBlank().isString()
  })
  test('taglist', 'The tag list must be an array or undefined', () => {
    enforce(data.article.taglist).oneOf(enforce.isNull(), enforce.isArray())
  })
})

export const get = async (event: ApiFetchEvent) => {
  return getWrapper(event)
}

export const post = async (event: ApiFetchEvent) => {
  return postWrapper(event, suite)
}
