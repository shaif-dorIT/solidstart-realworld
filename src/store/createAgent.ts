import {
  Actions,
  Agent,
  Article,
  ArticlePredicate,
  BodyArgTypes,
  LoginRequest,
  Optional,
  State,
  User
} from '~/types'

const API_ROOT = 'https://api.realworld.io/api'

const encode = encodeURIComponent

export default function createAgent([state, actions]: [State, Actions]): Agent {
  async function send(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: BodyArgTypes | undefined,
    resKey?: string | undefined
  ) {
    const headers = {},
      opts: RequestInit = { method, headers }
    if (data !== undefined) {
      headers['Content-Type'] = 'application/json'
      opts.body = JSON.stringify(data)
    }

    if (state.token) headers['Authorization'] = `Token ${state.token}`

    try {
      const response = await fetch(API_ROOT + url, opts)
      const json = await response.json()
      return resKey ? json[resKey] : json
    } catch (err) {
      if (err && err.response && err.response.status === 401) {
        actions.logout()
      }
      return err
    }
  }

  const Auth: Agent['Auth'] = {
    current: () => send('get', '/user', undefined, 'user'),
    login: (email: string, password: string) =>
      send('post', '/users/login', {
        user: { email, password }
      } as LoginRequest),
    register: (username: string, email: string, password: string) =>
      send('post', '/users', { user: { username, email, password } }),
    save: (user: Optional<User, keyof User>) => send('put', '/user', { user })
  }

  const Tags: Agent['Tags'] = {
    getAll: () => send('get', '/tags', undefined, 'tags')
  }

  const limit = (count: number, p: number) =>
    `limit=${count}&offset=${p ? p * count : 0}`
  const omitSlug = (
    article: Article | Optional<Article, keyof Article>
  ): Optional<Article, keyof Article> =>
    Object.assign({}, article, { slug: undefined })

  const Articles: Agent['Articles'] = {
    all: (page: number, lim = 10, predicate?: ArticlePredicate) =>
      predicate
        ? send(
            'get',
            `/articles?${new URLSearchParams(
              JSON.stringify(predicate)
            ).toString()}&${limit(lim, page)}`
          )
        : send('get', `/articles?${limit(lim, page)}`),
    byAuthor: (author: string, page: number, size = 5) =>
      send('get', `/articles?author=${encode(author)}&${limit(size, page)}`),
    byTag: (tag, page: number, lim = 10) =>
      send('get', `/articles?tag=${encode(tag)}&${limit(lim, page)}`),
    del: (slug: string) => send('delete', `/articles/${slug}`),
    favorite: (slug: string) => send('post', `/articles/${slug}/favorite`),
    favoritedBy: (author: string, page: number, size = 5) =>
      send('get', `/articles?favorited=${encode(author)}&${limit(size, page)}`),
    feed: (size = 10, offset = 0) =>
      send('get', `/articles/feed?${limit(size, offset)}`),
    get: (slug: string) =>
      send('get', `/articles/${slug}`, undefined, 'article'),
    unfavorite: (slug: string) => send('delete', `/articles/${slug}/favorite`),
    update: (article: Optional<Article, keyof Article>) =>
      send('put', `/articles/${article.slug}`, { article: omitSlug(article) }),
    create: (article: Article) => send('post', '/articles', { article })
  }

  const Comments: Agent['Comments'] = {
    create: (slug: string, comment) =>
      send('post', `/articles/${slug}/comments`, { comment }),
    delete: (slug: string, commentId: number) =>
      send('delete', `/articles/${slug}/comments/${commentId}`),
    forArticle: (slug: string) => {
      if (!slug) return
      return send('get', `/articles/${slug}/comments`, undefined, 'comments')
    }
  }

  const Profile: Agent['Profile'] = {
    follow: (username: string) => send('post', `/profiles/${username}/follow`),
    get: (username: string) =>
      send('get', `/profiles/${username}`, undefined, 'profile'),
    unfollow: (username: string) =>
      send('delete', `/profiles/${username}/follow`)
  }

  return {
    Articles,
    Auth,
    Comments,
    Profile,
    Tags
  } as Agent
}
