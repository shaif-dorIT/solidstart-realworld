import { useParams } from 'solid-start'

import type { Children } from '~/types'

type NavLinkProps = {
  route?: string
  class?: string
  active?: boolean
  href?: string
  children: Children
}

export default (props: NavLinkProps) => {
  const { routeName } = useParams()

  const testRoute = () => props.route && routeName === props.route

  return (
    <a
      class={props.class}
      classList={{
        active: props.active || testRoute()
      }}
      href={`${props.href || props.route}`}
      onClick={() => window.scrollTo(0, 0)}
    >
      {props.children}
    </a>
  )
}
