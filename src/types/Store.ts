import type { Setter } from 'solid-js'

import type {
  Article,
  Comment,
  CommentResponse,
  Optional,
  Profile,
  Tag,
  User
} from '.'

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
    author?: string
    myFeed?: boolean
    favoritedBy?: string
  }) => Promise<void>
  createArticle?: (article: Article) => Promise<Article>
  updateArticle?: (
    article: Optional<Article, keyof Article>
  ) => Promise<Article>
  deleteArticle?: (slug: string) => Promise<void>
  setPage?: (page: number) => Promise<void>
  setSlug?: (slug: string) => Promise<void>
  unmakeFavorite?: (slug: string) => Promise<void>
  makeFavorite?: (slug: string) => Promise<void>
  createComment?: (comment: Comment) => Promise<CommentResponse>
  deleteComment?: (commentId: number) => Promise<CommentResponse>
  loadComments?: (
    articleSlug: string,
    reload?: boolean | undefined
  ) => Comment[] | Promise<Comment[]>
  register?: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>
  pullUser?: () => true
  login?: (email: string, password: string) => Promise<void>
  logout?: () => void
  updateUser?: (newUser: User) => Promise<void>
  setToken?: (token: string) => void
  unfollow?: () => Promise<void>
  follow?: () => Promise<void>
  loadProfile?: Setter<string>
}
