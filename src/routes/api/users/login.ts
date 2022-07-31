import type { RequestContext } from 'solid-start/server/types'

const API_ROOT = 'https://api.realworld.io/api'

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
