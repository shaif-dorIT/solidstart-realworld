import { Profile, ErrorResponse, Tag, UserName } from '~/types'

export type ArticlePredicate = {
  myFeed?: boolean
  favoritedBy?: UserName
  tag?: Tag
  author?: UserName
}

export type Article = {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  /** Format: date-time */
  createdAt: string
  /** Format: date-time */
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Profile
}

export type NewArticle = {
  title: string
  description: string
  body: string
  tagList?: string[]
}

export type UpdateArticle = {
  title?: string
  description?: string
  body?: string
  tagList?: string[]
}

export type NewArticleRequest = {
  article: NewArticle
}

export type UpdateArticleRequest = {
  article: UpdateArticle
}

export type SingleArticleResponse = ErrorResponse & {
  article: Article
}

export type MultipleArticlesResponse = ErrorResponse & {
  articles: Article[]
  articlesCount: number
}
