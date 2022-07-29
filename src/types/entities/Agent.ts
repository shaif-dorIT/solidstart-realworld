import { Article, ArticlePredicate } from './Article'
import { Comment } from './Comment'
import { User } from './User'
import {
  ArticlesResponse,
  ArticleResponse,
  UserResponse,
  CommentResponse,
  ProfileResponse
} from '../index'
import { Optional } from '../Utils'

export type Agent = {
  Articles: {
    all: (
      page: number,
      lim?: number,
      predicate?: ArticlePredicate
    ) => Promise<ArticlesResponse>
    byAuthor: (
      author: string,
      page: number,
      size?: number
    ) => Promise<ArticlesResponse>
    byTag: (
      tag: string,
      page: number,
      lim?: number
    ) => Promise<ArticlesResponse>
    del: (slug: string) => Promise<ArticleResponse>
    favorite: (slug: string) => Promise<ArticleResponse>
    favoritedBy: (
      author: string,
      page: number,
      size?: number
    ) => Promise<ArticlesResponse>
    feed: (size?: number, offset?: number) => Promise<ArticlesResponse>
    get: (slug: string) => Promise<ArticleResponse>
    unfavorite: (slug: string) => Promise<ArticleResponse>
    update: (
      article: Optional<Article, keyof Article>
    ) => Promise<ArticleResponse>
    create: (article: Article) => Promise<ArticleResponse>
  }
  Auth: {
    current: () => Promise<User>
    login: (email: string, password: string) => Promise<UserResponse>
    register: (
      username: string,
      email: string,
      password: string
    ) => Promise<UserResponse>
    save: (user: Optional<User, keyof User>) => Promise<User>
  }
  Comments: {
    create: (slug: string, comment: Comment) => Promise<CommentResponse>
    delete: (slug: string, commentId: number) => Promise<CommentResponse>
    forArticle: (slug: string) => Promise<Comment[]>
  }
  Profile: {
    follow: (username: string) => Promise<ProfileResponse>
    get: (username: string) => Promise<ProfileResponse>
    unfollow: (username: string) => Promise<ProfileResponse>
  }
  Tags: { getAll: () => Promise<string[]> }
}
