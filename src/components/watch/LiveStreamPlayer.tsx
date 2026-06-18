import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ExternalLink, Loader2, Radio, VideoOff } from 'lucide-react'
import { queryKeys } from '#/lib/query-keys'
import { fetchStreamStatus } from '#/lib/server-fns'
import { useBird } from '#/context/BirdContext'
import { isBreedingSeason } from '#/lib/birds'

function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`
}

function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`
}

export default function LiveStreamPlayer({ videoId: overrideVideoId }: { videoId?: string }) {
  const { activeBird, activeBirdId } = useBird()
  const streams = activeBird.streams
  const [activeStreamId, setActiveStreamId] = useState(streams[0]?.id)

  useEffect(() => {
    setActiveStreamId(streams[0]?.id)
  }, [streams])

  const activeSource = streams.find((s) => s.id === activeStreamId) ?? streams[0]
  const isFirstStream = activeSource?.id === streams[0]?.id

  const breeding = isBreedingSeason(activeBirdId)
  const shouldAutoDetect = activeBird.autoDetectLive && !overrideVideoId && isFirstStream

  const { data: streamStatus, isLoading } = useQuery({
    queryKey: queryKeys.streamStatus,
    queryFn: () => fetchStreamStatus(),
    staleTime: 2 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    enabled: shouldAutoDetect,
  })

  const resolvedVideoId = overrideVideoId
    ?? (shouldAutoDetect ? (streamStatus?.videoId ?? activeSource?.videoId) : activeSource?.videoId)
    ?? ''
  const isLive = overrideVideoId
    ? true
    : shouldAutoDetect
      ? (streamStatus?.isLive ?? false)
      : true
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
        {isLoading && shouldAutoDetect ? (
          <span className="flex items-center gap-1.5 text-xs font-medium text-forest-400">
            <Loader2 className="h-3 w-3 animate-spin" />
            載入直播中...
          </span>
        ) : isLive ? (
          <span className="flex items-center gap-1.5 text-xs font-medium text-green-400">
            <Radio className="h-3 w-3 animate-pulse" />
            直播中
          </span>
        ) : breeding ? (
          <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400">
            <VideoOff className="h-3 w-3" />
            繁殖季 — 精選回顧
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-xs font-medium text-forest-400">
            <VideoOff className="h-3 w-3" />
            非繁殖季 — 精選回顧
          </span>
        )}
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
        {isLoading && shouldAutoDetect ? (
          <div className="absolute inset-0 flex items-center justify-center bg-forest-950">
            <Loader2 className="h-8 w-8 animate-spin text-forest-600" />
          </div>
        ) : (
          <iframe
            key={resolvedVideoId}
            src={embedUrl}
            title={`${activeBird.commonName}直播`}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {!isLive && !isLoading && (
        <div className="bg-forest-900/90 px-3 py-2">
          <p className="m-0 text-xs text-forest-400">
            目前無即時直播，正在播放精選回顧。
            <a
              href={getYouTubeWatchUrl(resolvedVideoId)}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-amber-500 hover:text-amber-400"
            >
              在 YouTube 觀看
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
