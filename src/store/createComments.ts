import { createResource } from 'solid-js'
import type { SetStoreFunction } from 'solid-js/store'
import { Actions, Agent, Comment, State } from '~/types'

export default function createComments(
  agent: Agent,
  actions: Actions,
  state: State,
  setState: SetStoreFunction<State>
) {
  const [comments, { mutate, refetch }] = createResource<Comment[], string>(
    () => state.articleSlug,
    async (slug: string) => {
      if (!slug) return []
      const resp = await agent.Comments.forArticle(slug)
      if (resp.errors) throw resp.errors

      return resp.comments
    },
    { initialValue: [] }
  )
  Object.assign(actions, {
    loadComments(articleSlug: string, reload?: boolean | undefined) {
      if (reload) return refetch()
      setState({ articleSlug })
    },
    async createComment(comment: Comment) {
      const { errors } = await agent.Comments.create(state.articleSlug, comment)
      if (errors) throw errors
    },
    async deleteComment(id: number) {
      mutate(comments().filter((c) => c.id !== id))
      try {
        await agent.Comments.delete(state.articleSlug, id)
      } catch (err) {
        actions.loadComments(state.articleSlug)
        throw err
      }
    }
  })
  return comments
}
