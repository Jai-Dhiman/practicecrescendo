import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recordings/[id]')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/recordings/[id]"!</div>
}
