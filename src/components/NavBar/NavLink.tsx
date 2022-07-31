import { useParams } from 'solid-app-router'

<<<<<<< HEAD
import type { Children } from '~/types'

type NavLinkProps = {
=======
import { Children } from '~/Children'

export default (props: {
>>>>>>> master
  route?: string
  class?: string
  active?: boolean
  href?: string
  children: Children
<<<<<<< HEAD
}

export default (props: NavLinkProps) => {
  const { routeName } = useParams()

  const testRoute = () => props.route && routeName === props.route
=======
}) => {
  const { routeName } = useParams()

  const testRoute = props.route && routeName === props.route
>>>>>>> master

  return (
    <a
      class={props.class}
      classList={{
<<<<<<< HEAD
        active: props.active || testRoute()
=======
        active: props.active || testRoute
>>>>>>> master
      }}
      href={`${props.href || props.route}`}
      onClick={() => window.scrollTo(0, 0)}
    >
      {props.children}
    </a>
  )
}
