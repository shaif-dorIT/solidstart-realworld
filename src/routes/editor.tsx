import useRouteData from 'solid-start'
import { Outlet } from 'solid-app-router'

export function routeData() {
  return { name: 'Jane' }
}

export default () => {
  const data = useRouteData<ReturnType<typeof routeData>>()

  return <Outlet />
}
