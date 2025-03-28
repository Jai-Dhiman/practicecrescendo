import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sheet-music/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/sheet-music/"!</div>
}
