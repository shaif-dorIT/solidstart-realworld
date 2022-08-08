import { Outlet } from 'solid-start'

import { useStore } from '~/store'

export default () => {
  const [, { loadArticles }] = useStore()

  loadArticles({})

  return <Outlet />
}
