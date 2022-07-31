import { ErrorResponse } from '~/types'
export type Tag = string

export type TagsResponse = ErrorResponse & {
  tags: Tag[]
}
