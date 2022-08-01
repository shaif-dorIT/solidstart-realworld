import { useParams } from 'solid-start'
import { createEffect, Show } from 'solid-js'

import { useStore } from '~/store'
import NavLink from '~/components/NavBar/NavLink'
import type { Profile } from '~/types'

export default (props) => {
  const username = () => useParams().userId.slice(1)
  const appSettings = () => {
    const [store, { setPage, loadProfile, loadArticles, unfollow, follow }] =
      useStore()
    return {
      store,
      actions: {
        follow,
        unfollow,
        setPage,
        loadArticles,
        loadProfile
      }
    }
  }

  createEffect(() => {
    console.log({ props })

    appSettings().actions.loadArticles({ author: username() })
    if (props.profile) appSettings().actions.loadProfile(username())
  })

  return (
    <>
      <Show when={props.profile}>
        <div class='row'>
          <div class='col-xs-12 col-md-10 offset-md-1'>
            <img
              src={props.profile()?.image}
              class='user-img'
              alt=''
            />
            <h4 textContent={username()} />
            <p>{props.profile()?.bio}</p>
            {props.isUser() && (
              <NavLink
                active={false}
                route='/settings'
                class='btn btn-sm btn-outline-secondary action-btn'
              >
                <i class='ion-gear-a' /> Edit Profile Settings
              </NavLink>
            )}
            {appSettings().store.token && !props.isUser() && (
              <button
                class='btn btn-sm action-btn'
                classList={{
                  'btn-secondary': props.profile()?.following,
                  'btn-outline-secondary': !props.profile()?.following
                }}
                onClick={props.handleClick}
              >
                <i class='ion-plus-round' />{' '}
                {props.profile()?.following ? 'Unfollow' : 'Follow'}{' '}
                {props.profile()?.username}
              </button>
            )}
          </div>
        </div>
      </Show>
      <Show when={!props.profile}>
        <div class='articles-toggle'>
          <ul class='nav nav-pills outline-active'>
            <li class='nav-item'>
              <NavLink
                class='nav-link'
                active={true}
                href={`/@${username()}`}
              >
                My Articles
              </NavLink>
            </li>

            <li class='nav-item'>
              <NavLink
                class='nav-link'
                active={false}
                href={`/@${username()}/favorites`}
              >
                Favorited Articles
              </NavLink>
            </li>
          </ul>
        </div>
      </Show>
    </>
  )
}

function newFunction(
  profile: () => Profile,
  username: () => string,
  isUser: () => boolean,
  handleClick: (ev: Event) => void
) {
  return (
    <div class='row'>
      <div class='col-xs-12 col-md-10 offset-md-1'>
        <img
          src={profile()?.image}
          class='user-img'
          alt=''
        />
        <h4 textContent={username()} />
        <p>{profile()?.bio}</p>
        {isUser() && (
          <NavLink
            active={false}
            route='/settings'
            class='btn btn-sm btn-outline-secondary action-btn'
          >
            <i class='ion-gear-a' /> Edit Profile Settings
          </NavLink>
        )}
        {appSettings().store.token && !isUser() && (
          <button
            class='btn btn-sm action-btn'
            classList={{
              'btn-secondary': profile()?.following,
              'btn-outline-secondary': !profile()?.following
            }}
            onClick={handleClick}
          >
            <i class='ion-plus-round' />{' '}
            {profile()?.following ? 'Unfollow' : 'Follow'} {profile()?.username}
          </button>
        )}
      </div>
    </div>
  )
}
