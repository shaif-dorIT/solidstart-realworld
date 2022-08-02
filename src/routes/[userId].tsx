import { createEffect } from 'solid-js'
import { Outlet, useParams } from 'solid-start'

import { useStore } from '~/store'
import NavLink from '~/components/NavBar/NavLink'
import ArticleList from '~/components/Article/ArticleList'

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
    loadProfile(username())
  })

  return (
    <div class='profile-page'>
      <Outlet />
    </div>
  )
}
