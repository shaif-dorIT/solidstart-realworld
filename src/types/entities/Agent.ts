import {
  Article,
  ArticlePredicate,
  MultipleArticlesResponse,
  MultipleCommentsResponse,
  NewComment,
  Optional,
  ProfileResponse,
  SingleArticleResponse,
  SingleCommentResponse,
  TagsResponse,
  User,
  UserResponse
} from '~/types'

export type SupportedRestHttpMethods = 'get' | 'post' | 'put' | 'delete'

export type Agent = {
  Articles: {
    all: (
      page: number,
      lim?: number,
      predicate?: ArticlePredicate
    ) => Promise<MultipleArticlesResponse>
    byAuthor: (
      author: string,
      page: number,
      size?: number
    ) => Promise<SingleArticleResponse>
    byTag: (
      tag: string,
      page: number,
      lim?: number
    ) => Promise<MultipleArticlesResponse>
    del: (slug: string) => Promise<SingleArticleResponse>
    favorite: (slug: string) => Promise<SingleArticleResponse>
    favoritedBy: (
      author: string,
      page: number,
      size?: number
    ) => Promise<MultipleArticlesResponse>
    feed: (size?: number, offset?: number) => Promise<MultipleArticlesResponse>
    get: (slug: string) => Promise<SingleArticleResponse>
    unfavorite: (slug: string) => Promise<SingleArticleResponse>
    update: (
      article: Optional<Article, keyof Article>
    ) => Promise<SingleArticleResponse>
    create: (article: Article) => Promise<SingleArticleResponse>
  }
  Auth: {
    current: () => Promise<User>
    login: (email: string, password: string) => Promise<UserResponse>
    register: (
      username: string,
      email: string,
      password: string
    ) => Promise<UserResponse>
    save: (user: Optional<User, keyof User>) => Promise<UserResponse>
  }
  Comments: {
    create: (
      slug: string,
      comment: NewComment
    ) => Promise<SingleCommentResponse>
    delete: (slug: string, commentId: number) => Promise<SingleCommentResponse>
    forArticle: (slug: string) => Promise<MultipleCommentsResponse>
  }
  Profile: {
    follow: (username: string) => Promise<ProfileResponse>
    get: (username: string) => Promise<ProfileResponse>
    unfollow: (username: string) => Promise<ProfileResponse>
  }
  Tags: { getAll: () => Promise<TagsResponse> }
}
