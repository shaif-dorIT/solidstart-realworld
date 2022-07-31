import { ErrorResponse } from '~/types'
export interface Profile {
  username: string
  bio: string
  image: string
  following: boolean
}

export type ProfileResponse = ErrorResponse & {
  profile: Profile
}
