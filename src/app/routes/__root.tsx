// Update src/app/routes/__root.tsx
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/lib/queryClient'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Crescendo Piano Platform' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-base-100">
          <header className="navbar bg-base-200">
            <div className="navbar-start">
              <div className="text-xl font-bold">Crescendo Piano</div>
            </div>
          </header>
          <main className="container mx-auto p-4">
            <Outlet />
          </main>
          <footer className="footer p-4 bg-base-200 text-base-content">
            <div>© {new Date().getFullYear()} Crescendo Piano Platform</div>
          </footer>
        </div>
      </QueryClientProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}