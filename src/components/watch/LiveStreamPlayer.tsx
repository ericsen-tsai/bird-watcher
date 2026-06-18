import { useEffect, useState } from 'react'
import { ExternalLink, Radio } from 'lucide-react'
import { useBird } from '#/context/BirdContext'

function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`
}

export default function LiveStreamPlayer({ videoId: overrideVideoId }: { videoId?: string }) {
  const { activeBird } = useBird()
  const streams = activeBird.streams
  const [activeStreamId, setActiveStreamId] = useState(streams[0]?.id)

  useEffect(() => {
    setActiveStreamId(streams[0]?.id)
  }, [streams])

  const activeSource = streams.find((s) => s.id === activeStreamId) ?? streams[0]
  const resolvedVideoId = overrideVideoId ?? activeSource?.videoId ?? ''
  const embedUrl = getYouTubeEmbedUrl(resolvedVideoId)

  return (
    <div className="flex h-full flex-col bg-black">
      {!overrideVideoId && streams.length > 1 && (
        <div className="flex shrink-0 border-b border-forest-800 bg-forest-950">
          {streams.map((source) => (
            <button
              key={source.id}
              type="button"
              onClick={() => setActiveStreamId(source.id)}
              className={`flex flex-1 items-center justify-center px-2 py-2 text-xs font-medium transition ${
                activeStreamId === source.id
                  ? 'border-b-2 border-amber-500 text-amber-400'
                  : 'text-forest-500 hover:text-forest-300'
              }`}
            >
              {source.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 bg-forest-900/80 px-3 py-1.5">
        <span className="flex items-center gap-1.5 text-xs font-medium text-green-400">
          <Radio className="h-3 w-3 animate-pulse" />
          直播中
        </span>
        {activeBird.youtubeChannelHandle && (
          <a
            href={`https://www.youtube.com/${activeBird.youtubeChannelHandle}/live`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1 text-xs text-forest-500 no-underline hover:text-amber-400 hover:no-underline"
          >
            YouTube
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      <div className="relative flex-1">
        <iframe
          key={resolvedVideoId}
          src={embedUrl}
          title={`${activeBird.commonName}直播`}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
