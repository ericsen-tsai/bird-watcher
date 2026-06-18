import { createFileRoute } from '@tanstack/react-router'
import Header from '#/components/Header'
import ResizableWatchLayout from '#/components/watch/ResizableWatchLayout'
import { BirdProvider } from '#/context/BirdContext'

export const Route = createFileRoute('/')({
  component: WatchPage,
})

function WatchPage() {
  const videoId = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('v') ?? undefined
    : undefined

  return (
    <BirdProvider>
      <div className="flex h-screen flex-col bg-forest-950">
        <Header />
        <main className="flex-1 overflow-hidden">
          <ResizableWatchLayout videoId={videoId} />
        </main>
      </div>
    </BirdProvider>
  )
}
