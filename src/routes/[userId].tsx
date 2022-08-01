import { createEffect } from 'solid-js'
import { Outlet, useParams } from 'solid-start'

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

  const profile = () => appSettings().store.profile

  createEffect(() => {
    appSettings().actions.loadProfile(username())
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
          <Outlet
            isUser={isUser}
            profile={profile}
            handleClick={handleClick}
          />
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
