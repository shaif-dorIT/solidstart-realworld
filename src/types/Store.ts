import { Setter } from 'solid-js'
import { Article } from './entities/Article'
import { Comment } from './entities/Comment'
import { Profile } from './entities/Profile'
import { User } from './entities/User'
import { Optional } from './Utils'
import { Tag } from './entities/Tag'

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
  createComment?: any
  deleteComment?: any
  loadComments?: any
  register?: any
  pullUser?: any
  login?: any
  logout?: any
  setToken?: any
  updateUser?: any
  unfollow?: () => Promise<void>
  follow?: () => Promise<void>
  loadProfile?: Setter<string>
}
