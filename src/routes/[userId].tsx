import { Outlet, useParams } from 'solid-start'
import { createComputed, createEffect, Suspense } from 'solid-js'

import { useStore } from '~/store'
import NavLink from '~/components/NavBar/NavLink'
import ArticleList from '~/components/Article/ArticleList'
import type { Profile } from '~/types'

export default () => {
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
  const { userId } = useParams()

  const username = () => {
    return userId.slice(1)
  }

  createEffect(() => {
    appSettings().actions.loadProfile(username())
  })
  let profile: Profile = {}
  createComputed(() => {
    profile = appSettings().store.profile
  })

  const handleClick = (ev: Event) => {
    ev.preventDefault()
    appSettings().store.profile.following
      ? appSettings().actions.unfollow()
      : appSettings().actions.follow()
  }

  const handleSetPage = (page: number) => {
    appSettings().actions.setPage(page)
    appSettings().actions.loadArticles({})
  }

  const isUser = () =>
    appSettings().store.currentUser &&
    username() === appSettings().store.currentUser.username

  return (
    <div class='profile-page'>
      <div class='user-info'>
        <div class='container'>
          <Suspense>
            <div class='row'>
              <div class='col-xs-12 col-md-10 offset-md-1'>
                <img
                  src={profile.image}
                  class='user-img'
                  alt=''
                />
                <h4 textContent={username()} />
                <p>{profile.bio}</p>
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
                      'btn-secondary': profile.following,
                      'btn-outline-secondary': !profile.following
                    }}
                    onClick={handleClick}
                  >
                    <i class='ion-plus-round' />{' '}
                    {profile.following ? 'Unfollow' : 'Follow'}{' '}
                    {profile.username}
                  </button>
                )}
              </div>
            </div>
          </Suspense>
        </div>
      </div>

      <div class='container'>
        <div class='row'>
          <div class='col-xs-12 col-md-10 offset-md-1'>
            <Outlet />

            <ArticleList
              currentPage={appSettings().store.page}
              articles={Object.values(appSettings().store.articles)}
              totalPagesCount={appSettings().store.totalPagesCount}
              onSetPage={handleSetPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
