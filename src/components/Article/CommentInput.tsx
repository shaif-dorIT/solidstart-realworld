import { createStore } from 'solid-js/store'

import type { NewComment, SingleCommentResponse, TextAreaEvent } from '~/types'
import CardForm from '../Form/CardForm'
import TextArea from '../Form/TextArea'

const DEFAULT_AVATAR = 'https://api.realworld.io/images/smiley-cyrus.jpeg'

export default (props: {
  createComment: (NewComment: NewComment) => Promise<SingleCommentResponse>
  avatarUrl: string
}) => {
  const [state, setState] = createStore<{
      body: string
      isCreatingComment?: boolean
    }>({
      body: ''
    }),
    handleBodyChange = (event: TextAreaEvent) =>
      setState({ body: event.currentTarget.value })

  const createCommentHandler = () => {
    setState({ isCreatingComment: true })
    return props.createComment({ body: state.body })
  }

  const postCommentCreation = () => setState({ isCreatingComment: false })

  return (
    <>
      <CardForm
        avatarUrl={props.avatarUrl ?? DEFAULT_AVATAR}
        buttonText='Post Comment'
        submitFn={createCommentHandler}
        postSubmitFn={postCommentCreation}
      >
        <TextArea
          placeholder='Write a comment...'
          value={state.body}
          disabled={state.isCreatingComment}
          onChange={handleBodyChange}
          rows='3'
        />
      </CardForm>
    </>
  )
}
