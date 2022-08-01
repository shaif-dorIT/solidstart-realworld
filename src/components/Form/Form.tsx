import { useNavigate } from 'solid-start'
import { createStore } from 'solid-js/store'

import Button from './Button'
import ListErrors from './ListErrors'
import type { Children } from '~/types'

type FormState = {
  inProgress: boolean
  errors?: string[]
}

type FormProps = {
  class?: string
  buttonText?: string
  children?: Children
  redirect?: string
  submitFn: (event: Event) => Promise<void> | Promise<unknown>
  postSubmitFn?: () => Promise<void> | void
}

export default (props: FormProps) => {
  const FormProps = () => {
    const {
      buttonText,
      submitFn,
      children,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      postSubmitFn = () => {},
      redirect = '/'
    } = props

    return {
      buttonText,
      children,
      submitFn,
      postSubmitFn,
      redirect
    }
  }

  const [state, setState] = createStore<FormState>({
    inProgress: false
  })

  const navigate = useNavigate()

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    setState({ inProgress: true })
    FormProps()
      .submitFn(event)
      .then((resp) => {
        const url = resp?.slug
          ? `${FormProps().redirect}/${resp.slug}`
          : FormProps().redirect
        return navigate(url)
      })
      .catch((errors: string[]) => setState({ errors }))
      .finally(() => setState({ inProgress: false }))

    return FormProps().postSubmitFn()
  }

  return (
    <>
      <ListErrors errors={state.errors} />
      <form
        class={props.class}
        onSubmit={handleSubmit}
      >
        <fieldset>
          {FormProps().children}
          <Button
            disabled={state.inProgress}
            type='submit'
            textContent={FormProps().buttonText}
          />
        </fieldset>
      </form>
    </>
  )
}
