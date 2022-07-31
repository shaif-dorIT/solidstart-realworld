import { Optional, ErrorResponse } from '~/types'

export type UserName = string

export type User = {
  email: string
  token: string
  username: UserName
  bio: string
  image: string
}

export type LoginUser = {
  email: string
  /** Format: password */
  password: string
}

export type NewUser = {
  user: LoginUser & { username: string }
}
export type UpdateUser = Optional<User, keyof User> & {
  /** Format: password */
  password?: string
}

export type LoginUserRequest = {
  user: LoginUser
}

export type NewUserRequest = {
  user: NewUser
}

export type UpdateUserRequest = {
  user: UpdateUser
}

export type UserResponse = ErrorResponse & {
  user: User
}
