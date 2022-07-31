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
  email: string
  password: string
}

export default () => {
  const [state, setState] = createStore<AuthState>({ email: '', password: '' }),
    [, { login }] = useStore()
<<<<<<< HEAD

  const handleLoginRequest = () => login(state.email, state.password)
=======
>>>>>>> master

  return (
    <div class='auth-page'>
      <div class='container page'>
        <div class='row'>
          <div class='col-md-6 offset-md-3 col-xs-12'>
            <h1
              class='text-xs-center'
              textContent='Sign in'
            />
            <p class='text-xs-center'>
              <NavLink route='/register'>Need an account?</NavLink>
            </p>
            <Form
              buttonText='Sign In'
<<<<<<< HEAD
              submitFn={handleLoginRequest}
=======
              submitFn={() => login(state.email, state.password)}
>>>>>>> master
            >
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
