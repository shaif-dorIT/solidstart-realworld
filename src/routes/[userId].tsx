import { createEffect } from 'solid-js'
import { Outlet, useParams } from 'solid-start'

import { useStore } from '~/store'
import UserInfo from '~/components/Profile/UserInfo'
import ArticleList from '~/components/Article/ArticleList'

export default () => {
  const [store, { setPage, loadProfile, loadArticles, unfollow, follow }] =
    useStore()
  const { userId } = useParams()

  const username = () => {
    return userId.slice(1)
  }

  const handleClick = (ev: Event) => {
    ev.preventDefault()
    store.profile.following ? unfollow() : follow()
  }

  const handleSetPage = (page: number) => {
    setPage(page)
    loadArticles({})
  }

  const isUser = () =>
    store.currentUser && username() === store.currentUser.username

  createEffect(() => {
    loadProfile(username())
  })

  return (
    <div class='profile-page'>
      <UserInfo
        profile={store.profile}
        token={store.token}
        isUser={isUser}
        handleClick={handleClick}
        username={username()}
      />

      <div class='container'>
        <div class='row'>
          <div class='col-xs-12 col-md-10 offset-md-1'>
            <Outlet />

            <ArticleList
              currentPage={store.page}
              articles={Object.values(store.articles)}
              totalPagesCount={store.totalPagesCount}
              onSetPage={handleSetPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
