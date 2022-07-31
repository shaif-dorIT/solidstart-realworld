import { createStore } from 'solid-js/store'

import { useStore } from '~/store'
import Form from '~/components/Form/Form'
import NavLink from '~/components/NavBar/NavLink'
import TextInput from '~/components/Form/TextInput'
<<<<<<< HEAD
import { TextInputEvent } from '~/types'
=======
>>>>>>> master

type AuthState = {
  username: string
  email: string
  password: string
  inProgress: boolean
  errors?: string[]
}

export default () => {
  const [, { register }] = useStore()
  const [state, setState] = createStore<AuthState>({
    username: '',
    email: '',
    password: '',
    inProgress: false
  })

  const handleRegisterRequest = () =>
    register(state.username, state.email, state.password)
  return (
    <div class='auth-page'>
      <div class='container page'>
        <div class='row'>
          <div class='col-md-6 offset-md-3 col-xs-12'>
            <h1
              class='text-xs-center'
              textContent='Sign up'
            />
            <p class='text-xs-center'>
              <NavLink route='/login'>Have an account?</NavLink>
            </p>
            <Form
              buttonText='Sign Up'
<<<<<<< HEAD
              submitFn={handleRegisterRequest}
=======
              submitFn={() =>
                register(state.username, state.email, state.password)
              }
>>>>>>> master
            >
              <TextInput
                placeholder='Username'
                value={state.username}
                onChange={(event: TextInputEvent) =>
                  setState({ username: event.currentTarget.value })
                }
              />
              <TextInput
                placeholder='Email'
                value={state.email}
                onChange={(event: TextInputEvent) =>
                  setState({ email: event.currentTarget.value })
                }
              />
              <TextInput
                placeholder='Password'
                type='password'
                value={state.password}
                onChange={(event: TextInputEvent) =>
                  setState({ password: event.currentTarget.value })
                }
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
