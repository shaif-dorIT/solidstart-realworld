import { create, test, enforce } from 'vest'
import type { ApiFetchEvent } from 'solid-start/api/types'

import { postWrapper } from '~/utils/fetcher'

const suite = create((data = {}) => {
  test('email', 'Email is required', () => {
    enforce(data.user.email).isNotNull().isNotBlank().isString()
  })
  test('username', 'Username is required', () => {
    enforce(data.user.username).isNotNull().isNotBlank().isString()
  })
  test('password', 'Password is required', () => {
    enforce(data.user.password).isNotNull().isNotBlank().isString()
  })
})

export const post = async (event: ApiFetchEvent) => {
  return postWrapper(event, suite)
}
