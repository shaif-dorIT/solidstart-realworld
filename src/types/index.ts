import type { Article } from './entities/Article'
import type { Comment } from './entities/Comment'
import type { Profile } from './entities/Profile'
import type { User } from './entities/User'
import { Optional } from './Utils'

export * from './entities/Agent'
export * from './entities/Article'
export * from './entities/Author'
export * from './entities/Comment'
export * from './entities/Profile'
export * from './entities/Tag'
export * from './entities/User'
export * from './Common'
export * from './Store'
export * from './Utils'

export type CustomErrors = {
  errors: {
    errorName: string[]
  }
}

export type AuthUser = Pick<User, 'username' | 'email'> & { password: string }

export type CreateUserRequest = {
  user: AuthUser
}

export type UpdateUserRequest = {
  user: Optional<User, keyof User>
}

export type LoginRequest = {
  user: Omit<AuthUser, 'username'>
}

export type CreateArticleRequest = {
  article: Article
}

export type UpdateArticleRequest = {
  article: Optional<Article, keyof Article>
}

export type CreateCommentRequest = {
  comment: Comment
}

export type BodyArgTypes =
  | LoginRequest
  | CreateUserRequest
  | UpdateUserRequest
  | CreateArticleRequest
  | UpdateArticleRequest
  | CreateCommentRequest

export type Response = {
  errors?: string[]
}

export type UserResponse = Response & {
  user: Omit<User, 'password'>
}

export type ProfileResponse = Response & {
  profile: Profile
}

export type ArticleResponse = Response & {
  article: Article
}

export type ArticlesResponse = Response & {
  articles: Article[]
  articlesCount: number
}

export type CommentResponse = Response & {
  comment: Comment
}
