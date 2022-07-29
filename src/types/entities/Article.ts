import { Tag } from './Tag'
import { Author } from './Author'
import { UserName } from './User'

export type ArticlePredicate = {
  myFeed?: boolean
  favoritedBy?: UserName
  tag?: Tag
  author?: UserName
}

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: Tag[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Author
}
