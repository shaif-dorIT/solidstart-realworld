import type { Setter } from 'solid-js'
import { PrismaClient } from '@prisma/client'

import type {
  Article,
  Comment,
  Profile,
  Tag,
  UpdateUser,
  User,
  MultipleArticlesResponse,
  MultipleCommentsResponse,
  SingleArticleResponse,
  SingleCommentResponse,
  ProfileResponse,
  UserResponse,
  UpdateArticle,
  NewComment,
  UserName
} from '~/types'

export type State = {
  readonly articles: { [slug: string]: Article } | null
  readonly comments: Comment[] | null
  readonly tags: Tag[] | null
  readonly profile: Profile | null
  readonly currentUser: User | null
  page: number
  totalPagesCount: number
  token: string
  appName: string
  articleSlug: string
}

export type Actions = {
  loadArticle?: (slug: string) => Promise<void>
  loadArticles?: (predicate: {
    tag?: Tag
    author?: UserName
    myFeed?: boolean
    favoritedBy?: string
  }) => Promise<MultipleArticlesResponse>
  createArticle?: (article: Article) => Promise<SingleArticleResponse>
  updateArticle?: (article: UpdateArticle) => Promise<SingleArticleResponse>
  deleteArticle?: (slug: string) => Promise<void>
  setPage?: (page: number) => Promise<void>
  setSlug?: (slug: string) => Promise<void>
  unmakeFavorite?: (slug: string) => Promise<SingleArticleResponse>
  makeFavorite?: (slug: string) => Promise<SingleArticleResponse>
  createComment?: (comment: NewComment) => Promise<SingleCommentResponse>
  deleteComment?: (commentId: number) => Promise<SingleCommentResponse>
  loadComments?: (
    articleSlug: string,
    reload?: boolean | undefined
  ) => Promise<MultipleCommentsResponse>
  register?: (
    username: string,
    email: string,
    password: string
  ) => Promise<UserResponse>
  pullUser?: () => true
  login?: (email: string, password: string) => Promise<UserResponse>
  logout?: () => void
  updateUser?: (updatedUserData: UpdateUser) => Promise<UserResponse>
  setToken?: (token: string) => void
  unfollow?: () => Promise<ProfileResponse>
  follow?: () => Promise<ProfileResponse>
  loadProfile?: Setter<string>
}
