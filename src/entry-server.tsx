import {
  StartServer,
  createHandler,
  renderAsync
} from 'solid-start/entry-server'

import validateEnv from '~/utils/validateEnv'

export default createHandler(() => {
  validateEnv()
  return renderAsync((event) => <StartServer event={event} />)()
})
