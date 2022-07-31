import { For } from 'solid-js'

import NavLink from '../NavBar/NavLink'
import type { Article, MouseButtonEvent } from '~/types'

const FAVORITED_CLASS = 'btn btn-sm btn-primary'
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary'

export default (props: {
  article: Article
  token: string
  onClickFavorite: (article: Article, event: MouseButtonEvent) => void
}) => {
  return (
    <div class='article-preview'>
      <div class='article-meta'>
        <NavLink
          href={`/@${props.article.author.username}`}
          route='/profile'
        >
          <img
            src={props.article.author.image}
            alt='The Author Avatar Image'
          />
        </NavLink>

        <div class='info'>
          <NavLink
            class='author'
            href={`/@${props.article.author.username}`}
            route='/profile'
          >
            {props.article.author.username}
          </NavLink>
          <span
            class='date'
            textContent={
              /*@once*/ new Date(props.article.createdAt).toDateString()
            }
          />
        </div>

        {props.token && (
          <div class='pull-xs-right'>
            <button
              class={
                props.article.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS
              }
              onClick={(ev) => props.onClickFavorite(props.article, ev)}
            >
              <i class='ion-heart' /> {props.article.favoritesCount}
            </button>
          </div>
        )}
      </div>

      <NavLink
        href={`article/${props.article.slug}`}
        route='/article'
        class='preview-link'
      >
        <h1>{props.article.title}</h1>
        <p>{props.article.description}</p>
        <span>Read more...</span>
        <ul class='tag-list'>
          <For each={props.article.tagList}>
            {(tag) => (
              <li
                class='tag-default tag-pill tag-outline'
                textContent={tag}
              />
            )}
          </For>
        </ul>
      </NavLink>
    </div>
  )
}
