import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Crescendo Piano Platform</h1>
      <p className="mb-4">
        Improve your piano playing through AI-powered analysis of your practice recordings.
      </p>
      <div className="flex gap-4">
        <button className="btn btn-primary">Get Started</button>
        <button className="btn btn-outline">Learn More</button>
      </div>
    </div>
  )
}