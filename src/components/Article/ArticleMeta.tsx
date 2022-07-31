import { Show } from 'solid-js'

import type { Article, MouseButtonEvent } from '~/types'
import NavLink from '~/components/NavBar/NavLink'

type ArticleMetaProps = {
  article: Article
  canModify: boolean
  onDelete: (event: MouseButtonEvent) => void
}

export default (props: ArticleMetaProps) => {
  return (
    <div class='article-meta'>
      <NavLink
        href={`/@${props.article?.author.username}`}
        route='/profile'
      >
        <img
          src={props.article?.author.image}
          alt=''
        />
      </NavLink>

      <div class='info'>
        <NavLink
          href={`/@${props.article?.author.username}`}
          route='/profile'
          class='author'
        >
          {props.article?.author.username}
        </NavLink>
        <span class='date'>
          {new Date(props.article?.createdAt).toDateString()}
        </span>
      </div>

      <Show
        when={props.canModify}
        fallback={<span />}
      >
        <span>
          <NavLink
            href={`/editor/${props.article.slug}`}
            class='btn btn-outline-secondary btn-sm'
          >
            <i class='ion-edit' /> Edit Article
          </NavLink>{' '}
          <button
            class='btn btn-outline-danger btn-sm'
            onClick={(event) => props.onDelete(event)}
          >
            <i class='ion-trash-a' /> Delete Article
          </button>
        </span>
      </Show>
    </div>
  )
}
