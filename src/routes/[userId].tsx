import { createEffect } from 'solid-js'
import { Outlet, useParams } from 'solid-start'

import { useStore } from '~/store'
import NavLink from '~/components/NavBar/NavLink'
import ArticleList from '~/components/Article/ArticleList'

export default (props: { username: string; routeName: string }) => {
  const appStore = () => {
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
    appStore().actions.loadProfile(username())
  })

  const handleClick = (ev: Event) => {
    ev.preventDefault()
    appStore().store.profile.following
      ? appStore().actions.unfollow()
      : appStore().actions.follow()
  }

  const handleSetPage = (page: number) => {
    appStore().actions.setPage(page)
    appStore().actions.loadArticles({})
  }

  const isUser = () =>
    appStore().store.currentUser &&
    username() === appStore().store.currentUser.username

  return (
    <div class='profile-page'>
      <div class='user-info'>
        <div class='container'>
          <div class='row'>
            <div class='col-xs-12 col-md-10 offset-md-1'>
              <img
                src={appStore().store.profile?.image}
                class='user-img'
                alt=''
              />
              <h4 textContent={props.username} />
              <p>{appStore().store.profile?.bio}</p>
              {isUser() && (
                <NavLink
                  active={false}
                  route='/settings'
                  class='btn btn-sm btn-outline-secondary action-btn'
                >
                  <i class='ion-gear-a' /> Edit Profile Settings
                </NavLink>
              )}
              {appStore().store.token && !isUser() && (
                <button
                  class='btn btn-sm action-btn'
                  classList={{
                    'btn-secondary': appStore().store.profile?.following,
                    'btn-outline-secondary':
                      !appStore().store.profile?.following
                  }}
                  onClick={handleClick}
                >
                  <i class='ion-plus-round' />{' '}
                  {appStore().store.profile?.following ? 'Unfollow' : 'Follow'}{' '}
                  {appStore().store.profile?.username}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div class='container'>
        <div class='row'>
          <div class='col-xs-12 col-md-10 offset-md-1'>
            <Outlet />

            <ArticleList
              currentPage={appStore().store.page}
              articles={Object.values(appStore().store.articles)}
              totalPagesCount={appStore().store.totalPagesCount}
              onSetPage={handleSetPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
