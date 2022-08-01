import { useNavigate } from 'solid-start'
import { createStore } from 'solid-js/store'

import Button from './Button'
import ListErrors from './ListErrors'
import type { Children, EntityResponse } from '~/types'

type FormState = {
  inProgress: boolean
  errors?: string[]
}

type CardFromProps = {
  class?: string
  avatarUrl: string
  buttonText?: string
  children?: Children
  redirect?: string
  submitFn?: (entity?: unknown) => Promise<EntityResponse> | Promise<void>
  postSubmitFn?: () => Promise<void> | void
}

export default (props: CardFromProps) => {
  const cardFormProps = () => {
    const { avatarUrl, buttonText, children, submitFn, postSubmitFn } = props
    return {
      avatarUrl,
      buttonText,
      children,
      submitFn,
      postSubmitFn
    }
  }

  const [state, setState] = createStore<FormState>({
    inProgress: false
  })

  const navigate = useNavigate()

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    setState({ inProgress: true })
    cardFormProps()
      .submitFn(event)
      .then(() => navigate('/'))
      .catch((errors: string[]) => setState({ errors }))
      .finally(() => setState({ inProgress: false }))

    return cardFormProps().postSubmitFn()
  }

  return (
    <>
      <ListErrors errors={state.errors} />
      <form
        class='card comment-form'
        onSubmit={handleSubmit}
      >
        <div class='card-block'>{cardFormProps().children}</div>
        <div class='card-footer'>
          <img
            src={cardFormProps().avatarUrl}
            class='comment-author-img'
            alt=''
          />
          <Button
            textContent={cardFormProps().buttonText}
            type='submit'
          />
        </div>
      </form>
    </>
  )
}
