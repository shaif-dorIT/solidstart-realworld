import { For, Show, Suspense } from 'solid-js'

import { useStore } from '~/store'
import type { Article, MouseLIEvent } from '~/types/'
import ArticlePreview from './ArticlePreview'

type ArticleProps = {
  articles: Article[]
  totalPagesCount: number
  currentPage: number
  onSetPage: (page: number) => void
}

export default (props: ArticleProps) => {
  const [{ token }, { unmakeFavorite, makeFavorite }] = useStore(),
    handleClickFavorite = (article: Article, event) => {
      event.preventDefault()
      article.favorited
        ? unmakeFavorite(article.slug)
        : makeFavorite(article.slug)
    },
    handlePage = (v: number, e: MouseLIEvent) => {
      e.preventDefault()
      props.onSetPage(v)
      setTimeout(() => window.scrollTo(0, 0), 200)
    }
  return (
    <Suspense fallback={<div class='article-preview'>Loading articles...</div>}>
      <section class='article-list'>
        <For
          each={props.articles}
          fallback={
            <div class='article-preview'>No articles are here... yet.</div>
          }
        >
          {(article) => (
            <ArticlePreview
              article={article}
              token={token}
              onClickFavorite={handleClickFavorite}
            />
          )}
        </For>
        <Show when={props.totalPagesCount > 1}>
          <nav>
            <ul class='pagination'>
              <For each={[...Array(props.totalPagesCount).keys()]}>
                {(v) => (
                  <li
                    class='page-item'
                    classList={{ active: props.currentPage === v }}
                    onClick={(ev) => handlePage(v, ev)}
                  >
                    <a
                      class='page-link'
                      href=''
                      textContent={v + 1}
                    />
                  </li>
                )}
              </For>
            </ul>
          </nav>
        </Show>
      </section>
    </Suspense>
  )
}
