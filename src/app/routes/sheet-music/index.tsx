// src/app/routes/sheet-music/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { usePieces } from './usePieces'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/sheet-music/')({
  component: SheetMusicPage,
})

function SheetMusicPage() {
  const { data: pieces, isLoading, error } = usePieces();

  if (isLoading) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  if (error) {
    return <div className="alert alert-error">Error loading sheet music: {error.message}</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Sheet Music Library</h1>
      
      {pieces && pieces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pieces.map((piece) => (
            <div key={piece.id} className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{piece.title}</h2>
                <p>Composer: {piece.composer}</p>
                <p>Difficulty: {piece.difficulty}/10</p>
                <div className="card-actions justify-end">
                  <Link 
                    to="/sheet-music/$id" 
                    params={{ id: piece.id }}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert">
          <span>No sheet music found. Add some to get started!</span>
        </div>
      )}
      
      <button className="btn btn-primary mt-6">Add New Sheet Music</button>
    </div>
  )
}