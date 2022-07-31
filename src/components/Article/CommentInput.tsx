import { createStore } from 'solid-js/store'
<<<<<<< HEAD

import { TextAreaChangeEvent } from '~/types'
import CardForm from '../Form/CardForm'
import TextArea from '../Form/TextArea'

=======
import { TextAreaChangeEvent } from '~/types'
import CardForm from '../Form/CardForm'
import TextArea from '../Form/TextArea'

>>>>>>> master
const DEFAULT_AVATAR = 'https://api.realworld.io/images/smiley-cyrus.jpeg'

export default (props) => {
  const [state, setState] = createStore<{
      body: string
      isCreatingComment?: boolean
    }>({
      body: ''
    }),
    handleBodyChange = (event: TextAreaChangeEvent) =>
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
