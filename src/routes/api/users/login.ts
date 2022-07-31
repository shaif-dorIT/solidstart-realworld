import type { RequestContext } from 'solid-start/server/types'

const API_ROOT = 'https://api.realworld.io/api'

const mutations = async (
  method: 'post' | 'put' | 'delete',
  apiPath: string,
  body?: unknown
) => {
  const fetchOptions: RequestInit = {
    method: method
  }

  if (method === 'post' && !body) {
    return [400, { msg: 'need to provide a body in a POST request' }]
  } else {
    fetchOptions.body = JSON.stringify(body)
    fetchOptions.headers = {
      'Content-Type': 'application/json'
    }
  }

  const resp = await fetch(API_ROOT + apiPath, fetchOptions)

  if (resp.ok) {
    return [resp.status, { msg: resp.statusText, data: await resp.json() }]
  } else {
    return [resp.status, { msg: resp.statusText }]
  }
}

const serverFunction = async (ctx: RequestContext) => {
  const body = await ctx.request.json()

  if (!body) return

  const resp = await fetch(API_ROOT + '/users/login', {
    method: 'POST',
    body: JSON.stringify({
      user: { email: 'test29@test.com', password: 'test29' }
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return new Response(JSON.stringify({ message: await resp.json() }), {
    context: ctx,
    status: 200,
    statusText: 'OK'
  })
}

export const post = serverFunction
