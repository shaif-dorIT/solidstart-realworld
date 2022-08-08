import {
  Actions,
  Agent,
  Article,
  ArticlePredicate,
  EntityRequest,
  EntityResponse,
  Optional,
  State,
  SupportedRestHttpMethods,
  User
} from '~/types'

const API_ROOT = 'https://api.realworld.io/api'

const encode = encodeURIComponent

export default function createAgent([state, actions]: [State, Actions]): Agent {
  async function send(
    method: SupportedRestHttpMethods,
    url: string,
    data?: EntityRequest | undefined,
    resKey?:
      | 'user'
      | 'article'
      | 'articles'
      | 'comment'
      | 'comments'
      | 'tags'
      | 'profile'
      | undefined
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
      const json: EntityResponse = await response.json()
      const entity = resKey ? json[resKey] : json
      const errors = json.errors?.body ?? undefined
      return { data: entity, errors }
    } catch (err) {
      if (err?.response?.status === 401) {
        actions.logout()
      } else if (err?.response?.status === 422) {
        return {
          data: { msg: 'Invalid was data provided in body' },
          errors: err.response.errors.body
        }
      }
      return {
        data: { msg: 'something went wrong...' },
        errors: err.response.errors.body
      }
    }
  }

  const Auth: Agent['Auth'] = {
    current: async () => {
      const resp = await send('get', '/user', undefined, 'user')
      return resp.data ? resp.data : resp.errors
    },
    login: async (email: string, password: string) => {
      const resp = await send('post', '/users/login', {
        user: { email, password }
      })
      return resp.data ? resp.data : resp.errors
    },
    register: async (username: string, email: string, password: string) => {
      const resp = await send('post', '/users', {
        user: { username, email, password }
      })
      return resp.data ? resp.data : resp.errors
    },
    save: async (user: Optional<User, keyof User>) => {
      const resp = await send('put', '/user', { user })
      return resp.data ? resp.data : resp.errors
    }
  }

  const Tags: Agent['Tags'] = {
    getAll: async () => {
      const resp = await send('get', '/tags')
      return resp.data ? resp.data : resp.errors
    }
  }

  const limit = (count: number, p: number) =>
    `limit=${count}&offset=${p ? p * count : 0}`
  const omitSlug = (
    article: Article | Optional<Article, keyof Article>
  ): Optional<Article, keyof Article> =>
    Object.assign({}, article, { slug: undefined })

  const Articles: Agent['Articles'] = {
    all: async (page: number, lim = 10, predicate?: ArticlePredicate) => {
      const resp = predicate
        ? await send(
            'get',
            `/articles?${new URLSearchParams(
              JSON.stringify(predicate)
            ).toString()}&${limit(lim, page)}`
          )
        : await send('get', `/articles?${limit(lim, page)}`)
      return resp.data ? resp.data : resp.errors
    },
    byAuthor: async (author: string, page: number, size = 5) => {
      const resp = await send(
        'get',
        `/articles?author=${encode(author)}&${limit(size, page)}`
      )
      return resp.data ? resp.data : resp.errors
    },
    byTag: async (tag, page: number, lim = 10) => {
      const resp = await send(
        'get',
        `/articles?tag=${encode(tag)}&${limit(lim, page)}`
      )
      return resp.data ? resp.data : resp.errors
    },
    del: async (slug: string) => {
      const resp = await send('delete', `/articles/${slug}`)
      return resp.data ? resp.data : resp.errors
    },
    favorite: async (slug: string) => {
      const resp = await send('post', `/articles/${slug}/favorite`)
      return resp.data ? resp.data : resp.errors
    },
    favoritedBy: async (author: string, page: number, size = 5) => {
      const resp = await send(
        'get',
        `/articles?favorited=${encode(author)}&${limit(size, page)}`
      )
      return resp.data ? resp.data : resp.errors
    },
    feed: async (size = 10, offset = 0) => {
      const resp = await send('get', `/articles/feed?${limit(size, offset)}`)
      return resp.data ? resp.data : resp.errors
    },
    get: async (slug: string) => {
      const resp = await send('get', `/articles/${slug}`, undefined, 'article')
      return resp.data ? resp.data : resp.errors
    },
    unfavorite: async (slug: string) => {
      const resp = await send('delete', `/articles/${slug}/favorite`)
      return resp.data ? resp.data : resp.errors
    },
    update: async (article: Optional<Article, keyof Article>) => {
      const resp = await send('put', `/articles/${article.slug}`, {
        article: omitSlug(article)
      })
      return resp.data ? resp.data : resp.errors
    },
    create: async (article: Article) => {
      const resp = await send('post', '/articles', { article })
      return resp.data ? resp.data : resp.errors
    }
  }

  const Comments: Agent['Comments'] = {
    create: async (slug: string, comment) => {
      const resp = await send('post', `/articles/${slug}/comments`, { comment })
      return resp.data ? resp.data : resp.errors
    },
    delete: async (slug: string, commentId: number) => {
      const resp = await send(
        'delete',
        `/articles/${slug}/comments/${commentId}`
      )
      return resp.data ? resp.data : resp.errors
    },
    forArticle: async (slug: string) => {
      {
        if (!slug) return
        const resp = await send(
          'get',
          `/articles/${slug}/comments`,
          undefined,
          'comments'
        )

        return resp.data ? resp.data : resp.errors
      }
    }
  }

  const Profile: Agent['Profile'] = {
    follow: async (username: string) => {
      const resp = await send('post', `/profiles/${username}/follow`)
      return resp.data ? resp.data : resp.errors
    },
    get: async (username: string) => {
      const resp = await send(
        'get',
        `/profiles/${username}`,
        undefined,
        'profile'
      )

      return resp.data ? resp.data : resp.errors
    },
    unfollow: async (username: string) => {
      const resp = await send('delete', `/profiles/${username}/follow`)
      return resp.data ? resp.data : resp.errors
    }
  }

  return {
    Articles,
    Auth,
    Comments,
    Profile,
    Tags
  } as Agent
}
