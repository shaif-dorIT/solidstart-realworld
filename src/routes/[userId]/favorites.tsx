import { useParams } from 'solid-start'
import { createEffect } from 'solid-js'

import { useStore } from '~/store'
import NavLink from '~/components/NavBar/NavLink'

export default () => {
  const [, { loadArticles }] = useStore()

  const username = () => useParams().userId.slice(1)

  createEffect(() => {
    loadArticles({ favoritedBy: username() })
  })

  return (
    <div class='articles-toggle'>
      <ul class='nav nav-pills outline-active'>
        <li class='nav-item'>
          <NavLink
            class='nav-link'
            active={false}
            href={`/@${username()}`}
          >
            My Articles
          </NavLink>
        </li>

        <li class='nav-item'>
          <NavLink
            class='nav-link'
            active={true}
            href={`/@${username()}/favorites`}
          >
            Favorited Articles
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
