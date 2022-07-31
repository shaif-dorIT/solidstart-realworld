import { Outlet } from 'solid-app-router'

import { useStore } from '~/store'

export default () => {
<<<<<<< HEAD
  const [, { loadArticles }] = useStore()
=======
  const [_, { loadArticles }] = useStore()
>>>>>>> master

  loadArticles({})

  return <Outlet />
}
