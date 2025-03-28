import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recordings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/recordings/"!</div>
}
