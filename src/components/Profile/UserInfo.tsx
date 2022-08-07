import NavLink from '../NavBar/NavLink'
import type { MouseButtonEvent, Profile } from '~/types'

export default (props: {
  token: string
  profile: Profile
  username: string
  isUser: () => boolean
  handleClick: (ev: MouseButtonEvent) => void
}) => {
  const info = () => {
    const { token, profile, username, isUser, handleClick } = props
    return {
      token,
      profile,
      username,
      isUser,
      handleClick
    }
  }

  return (
    <div class='user-info'>
      <div class='container'>
        <div class='row'>
          <div class='col-xs-12 col-md-10 offset-md-1'>
            <img
              src={info().profile?.image}
              class='user-img'
              alt=''
            />
            <h4 textContent={info().profile?.username} />
            <p>{info().profile?.bio}</p>
            {info().isUser() && (
              <NavLink
                active={false}
                route='/settings'
                class='btn btn-sm btn-outline-secondary action-btn'
              >
                <i class='ion-gear-a' /> Edit Profile Settings
              </NavLink>
            )}
            {info().token && !info().isUser() && (
              <button
                class='btn btn-sm action-btn'
                classList={{
                  'btn-secondary': info().profile?.following,
                  'btn-outline-secondary': !info().profile?.following
                }}
                onClick={info().handleClick}
              >
                <i class='ion-plus-round' />{' '}
                {info().profile?.following ? 'Unfollow' : 'Follow'}{' '}
                {info().profile?.username}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
