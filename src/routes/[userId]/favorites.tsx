import { createEffect } from 'solid-js'
import { useParams } from 'solid-app-router'

import { useStore } from '~/store'
import NavLink from '~/components/NavBar/NavLink'

export default () => {
  const [, { loadArticles }] = useStore()

  const username = () => useParams().userId

  createEffect(() => {
    loadArticles({ favoritedBy: username().slice(1) })
  })

  return (
    <div class='articles-toggle'>
      <ul class='nav nav-pills outline-active'>
        <li class='nav-item'>
          <NavLink
            class='nav-link'
            active={false}
            href={`/${username()}`}
          >
            My Articles
          </NavLink>
        </li>

        <li class='nav-item'>
          <NavLink
            class='nav-link'
            active={true}
            href={`/${username()}/favorites`}
          >
            Favorited Articles
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
