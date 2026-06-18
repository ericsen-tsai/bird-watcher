import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { BIRDS, DEFAULT_BIRD_ID, type BirdId, type BirdProfile } from '#/lib/birds'

interface BirdContextValue {
  activeBirdId: BirdId
  activeBird: BirdProfile
  setActiveBirdId: (id: BirdId) => void
}

const BirdContext = createContext<BirdContextValue | null>(null)

const STORAGE_KEY = 'bird-watcher-active-bird'

function getInitialBirdId(): BirdId {
  if (typeof window === 'undefined') return DEFAULT_BIRD_ID
  const params = new URLSearchParams(window.location.search)
  const fromUrl = params.get('bird')
  if (fromUrl && fromUrl in BIRDS) return fromUrl as BirdId
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && stored in BIRDS) return stored as BirdId
  return DEFAULT_BIRD_ID
}

export function BirdProvider({ children }: { children: ReactNode }) {
  const [activeBirdId, setActiveBirdIdState] = useState<BirdId>(getInitialBirdId)

  const setActiveBirdId = useCallback((id: BirdId) => {
    setActiveBirdIdState(id)
    localStorage.setItem(STORAGE_KEY, id)
    const url = new URL(window.location.href)
    url.searchParams.set('bird', id)
    window.history.replaceState({}, '', url.toString())
  }, [])

  return (
    <BirdContext.Provider value={{ activeBirdId, activeBird: BIRDS[activeBirdId], setActiveBirdId }}>
      {children}
    </BirdContext.Provider>
  )
}

export function useBird(): BirdContextValue {
  const ctx = useContext(BirdContext)
  if (!ctx) throw new Error('useBird must be used within BirdProvider')
  return ctx
}
