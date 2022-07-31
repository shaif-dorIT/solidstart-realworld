import { Outlet } from 'solid-app-router'

import { useStore } from '~/store'

export default () => {
  const [, { loadArticles }] = useStore()

  loadArticles({})

  return <Outlet />
}
