import { createServerFn } from '@tanstack/react-start'

export interface StreamStatus {
  videoId: string
  isLive: boolean
  source: 'override' | 'youtube-api' | 'scrape' | 'fallback'
}

const RRGT_CHANNEL_ID = 'UC1uTmFzNUM1b3FzZlZWVklz'
const RRGT_CHANNEL_HANDLE = '@RRGT'
const DEFAULT_VIDEO_ID = 'gsCR_X6Dx_U'

export const fetchStreamStatus = createServerFn({ method: 'GET' }).handler(
  async (): Promise<StreamStatus> => {
    const override =
      process.env.VITE_YOUTUBE_LIVE_VIDEO_ID || process.env.YOUTUBE_LIVE_VIDEO_ID
    if (override) {
      return { videoId: override, isLive: true, source: 'override' }
    }

    const apiKey = process.env.YOUTUBE_API_KEY
    if (apiKey) {
      const fromApi = await fetchLiveFromYouTubeApi(apiKey).catch(() => null)
      if (fromApi) return fromApi
    }

    const fromScrape = await fetchLiveFromChannelPage().catch(() => null)
    if (fromScrape) return fromScrape

    return { videoId: DEFAULT_VIDEO_ID, isLive: false, source: 'fallback' }
  },
)

async function fetchLiveFromYouTubeApi(apiKey: string): Promise<StreamStatus | null> {
  const url = new URL('https://www.googleapis.com/youtube/v3/search')
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('channelId', RRGT_CHANNEL_ID)
  url.searchParams.set('eventType', 'live')
  url.searchParams.set('type', 'video')
  url.searchParams.set('maxResults', '1')
  url.searchParams.set('key', apiKey)

  const res = await fetch(url.toString(), { signal: AbortSignal.timeout(8000) })
  if (!res.ok) return null

  const data = (await res.json()) as {
    items?: Array<{ id?: { videoId?: string } }>
  }
  const videoId = data.items?.[0]?.id?.videoId
  if (!videoId) return null

  return { videoId, isLive: true, source: 'youtube-api' }
}

async function fetchLiveFromChannelPage(): Promise<StreamStatus | null> {
  const res = await fetch(`https://www.youtube.com/${RRGT_CHANNEL_HANDLE}/live`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BirdWatcher/1.0)' },
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) return null

  const html = await res.text()
  const match = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/)
  if (!match?.[1]) return null

  return { videoId: match[1], isLive: true, source: 'scrape' }
}
