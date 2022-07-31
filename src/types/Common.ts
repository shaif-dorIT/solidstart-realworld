import type { JSX } from 'solid-js'

import type {
  LoginUserRequest,
  NewArticleRequest,
  NewCommentRequest,
  Optional,
  UpdateUserRequest,
  UpdateArticleRequest,
  NewUserRequest,
  UserResponse,
  ProfileResponse,
  SingleArticleResponse,
  MultipleArticlesResponse,
  MultipleCommentsResponse,
  SingleCommentResponse,
  TagsResponse
} from '~/types'

export type Children =
  | number
  | boolean
  | Node
  | JSX.Element
  | JSX.ArrayElement
  | JSX.FunctionElement
  | (string & Record<string, unknown>)

type GenericErrorModel = {
  errors: {
    body: string[]
  }
}

export type EntityRequest =
  | LoginUserRequest
  | NewUserRequest
  | UpdateUserRequest
  | NewArticleRequest
  | UpdateArticleRequest
  | NewCommentRequest

export type EntityResponse =
  | UserResponse
  | SingleArticleResponse
  | MultipleArticlesResponse
  | ProfileResponse
  | SingleCommentResponse
  | MultipleCommentsResponse
  | TagsResponse

export type ErrorResponse = Optional<GenericErrorModel, keyof GenericErrorModel>
