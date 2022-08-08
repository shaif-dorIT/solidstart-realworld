import { Suite } from 'vest'
import type { ApiFetchEvent } from 'solid-start/api/types'

const API_ROOT = 'https://api.realworld.io/api'

const mutations = async (
  method: 'post' | 'put' | 'delete',
  apiPath: string,
  {
    body,
    token,
    suite
  }: {
    body?: unknown
    token?: string
    suite?: Suite<(data: unknown) => void>
  }
): Promise<[number, { msg: string; data?: object }]> => {
  const fetchOptions: RequestInit = {
    method: method
  }

  if (body) {
    if (suite) {
      const result = suite(body)
      if (!result.isValid())
        return [
          422,
          {
            data: {
              errors: {
                body: Object.values(result.getErrors()).flatMap(
                  (string) => string
                )
              }
            },
            msg: 'Bad request'
          }
        ]
    }

    fetchOptions.body = JSON.stringify(body)
    fetchOptions.headers = {
      'Content-Type': 'application/json'
    }
  }

  if (token) {
    fetchOptions.headers['Authorization'] = `Token ${token}`
  }

  const resp = await fetch(API_ROOT + apiPath, fetchOptions)

  if (resp.ok) {
    return [resp.status, { msg: resp.statusText, data: await resp.json() }]
  } else {
    return [resp.status, { msg: resp.statusText }]
  }
}

const query = async (
  apiPath: string,
  {
    token
  }: {
    token?: string
  }
): Promise<[number, { msg: string; data?: string }]> => {
  const fetchOptions: RequestInit = {
    method: 'get'
  }

  fetchOptions.headers = {
    'Content-Type': 'application/json'
  }

  if (token) {
    fetchOptions.headers['Authorization'] = `Token ${token}`
  }

  const resp = await fetch(API_ROOT + apiPath, fetchOptions)

  if (resp.ok) {
    return [resp.status, { msg: resp.statusText, data: await resp.json() }]
  } else {
    return [resp.status, { msg: resp.statusText }]
  }
}

export const getWrapper = async (event: ApiFetchEvent) => {
  const apiPath = new URL(event.request.url).pathname.slice(4)

  const authHeader = event.request.headers.get('Authorization') ?? undefined
  const splitted = authHeader?.split(' ')
  const token = splitted && splitted.length == 2 ? splitted[1] : undefined
  const [statusCode, resp] = await query(apiPath, { token })

  if (statusCode >= 200 && statusCode < 300) {
    return new Response(JSON.stringify(resp.data), {
      status: statusCode,
      statusText: resp.msg
    })
  } else {
    return new Response(JSON.stringify({ message: resp.msg }), {
      status: statusCode,
      statusText: 'OK'
    })
  }
}

export const postWrapper = async (
  event: ApiFetchEvent,
  suite: Suite<(data: unknown) => void>
) => {
  const apiPath = new URL(event.request.url).pathname.slice(4)

  const body = (await event.request.json()) ?? undefined

  const token =
    event.request.headers.get('Authorization')?.split(' ')[1] ?? undefined

  const [statusCode, resp] = await mutations('post', apiPath, {
    body,
    token,
    suite
  })

  if ((statusCode >= 200 && statusCode < 300) || statusCode === 422) {
    return new Response(JSON.stringify(resp.data), {
      status: statusCode,
      statusText: resp.msg
    })
  } else {
    return new Response(JSON.stringify({ message: resp.msg }), {
      status: statusCode,
      statusText: resp.msg
    })
  }
}

export const putWrapper = async (
  event: ApiFetchEvent,
  suite: Suite<(data: unknown) => void>
) => {
  const apiPath = new URL(event.request.url).pathname.slice(4)
  const body = (await event.request.json()) ?? undefined
  const token =
    event.request.headers.get('Authorization')?.split(' ')[1] ?? undefined

  const [statusCode, resp] = await mutations('put', apiPath, {
    body,
    token,
    suite
  })

  if ((statusCode >= 200 && statusCode < 300) || statusCode === 422) {
    return new Response(JSON.stringify(resp.data), {
      status: statusCode,
      statusText: resp.msg
    })
  } else {
    return new Response(JSON.stringify({ message: resp.msg }), {
      status: statusCode,
      statusText: resp.msg
    })
  }
}

export const delWrapper = async (event: ApiFetchEvent) => {
  const apiPath = new URL(event.request.url).pathname.slice(4)
  const authHeader = event.request.headers.get('Authorization') ?? undefined
  const splitted = authHeader?.split(' ')
  const token = splitted && splitted.length == 2 ? splitted[1] : undefined

  const [statusCode, resp] = await mutations('delete', apiPath, { token })

  if (statusCode >= 200 && statusCode < 300) {
    return new Response(JSON.stringify(resp.data), {
      status: statusCode,
      statusText: resp.msg
    })
  } else {
    return new Response(JSON.stringify({ message: resp.msg }), {
      status: statusCode,
      statusText: 'OK'
    })
  }
}
