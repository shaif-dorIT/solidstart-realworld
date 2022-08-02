import type { Profile } from '~/types'
import NavLink from '../NavBar/NavLink'

export default (props: {
  token: string
  profile: Profile
  username: string
  isUser: () => boolean
  handleClick: (ev: Event) => void
}) => {
  const { token, profile, username, isUser, handleClick } = props
  return (
    <div class='user-info'>
      <div class='container'>
        <div class='row'>
          <div class='col-xs-12 col-md-10 offset-md-1'>
            <img
              src={profile?.image}
              class='user-img'
              alt=''
            />
            <h4 textContent={username} />
            <p>{profile?.bio}</p>
            {isUser() && (
              <NavLink
                active={false}
                route='/settings'
                class='btn btn-sm btn-outline-secondary action-btn'
              >
                <i class='ion-gear-a' /> Edit Profile Settings
              </NavLink>
            )}
            {token && !isUser() && (
              <button
                class='btn btn-sm action-btn'
                classList={{
                  'btn-secondary': profile?.following,
                  'btn-outline-secondary': !profile?.following
                }}
                onClick={handleClick}
              >
                <i class='ion-plus-round' />{' '}
                {profile?.following ? 'Unfollow' : 'Follow'} {profile?.username}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
