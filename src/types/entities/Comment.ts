import { Profile, ErrorResponse } from '~/types'
export interface Comment {
  id: number
  /** Format: date-time */
  createdAt: string
  /** Format: date-time */
  updatedAt: string
  body: string
  author: Profile
}

export type NewComment = {
  body: string
}
export type NewCommentRequest = {
  comment: NewComment
}

export type SingleCommentResponse = ErrorResponse & {
  comment: Comment
}
export type MultipleCommentsResponse = ErrorResponse & {
  comments: Comment[]
}
