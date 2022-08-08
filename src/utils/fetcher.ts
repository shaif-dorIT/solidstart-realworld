import type { ApiFetchEvent } from 'solid-start/api/types'

const API_ROOT = 'https://api.realworld.io/api'

const mutations = async (
  method: 'post' | 'put' | 'delete',
  apiPath: string,
  {
    body,
    token
  }: {
    body?: unknown
    token?: string
  }
): Promise<[number, { msg: string; data?: string }]> => {
  const fetchOptions: RequestInit = {
    method: method
  }

  if (body) {
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

export const postWrapper = async (event: ApiFetchEvent) => {
  const apiPath = new URL(event.request.url).pathname.slice(4)

  const body = (await event.request.json()) ?? undefined
  const token =
    event.request.headers.get('Authorization')?.split(' ')[1] ?? undefined

  const [statusCode, resp] = await mutations('post', apiPath, { body, token })

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

export const putWrapper = async (event: ApiFetchEvent) => {
  const apiPath = new URL(event.request.url).pathname.slice(4)
  const body = (await event.request.json()) ?? undefined
  const token =
    event.request.headers.get('Authorization')?.split(' ')[1] ?? undefined

  const [statusCode, resp] = await mutations('put', apiPath, { body, token })

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
