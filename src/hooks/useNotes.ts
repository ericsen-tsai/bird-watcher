import { useCallback, useEffect, useState } from 'react'
import { loadNotes, saveNotes, type NoteEntry } from '#/lib/notes-store'
import type { BirdId } from '#/lib/birds'

export function useNotes(birdId: BirdId) {
  const [entries, setEntries] = useState<NoteEntry[]>([])

  useEffect(() => {
    setEntries(loadNotes(birdId))
  }, [birdId])

  const addNote = useCallback((content: string, timestamp?: number) => {
    setEntries((prev) => {
      const entry: NoteEntry = {
        id: crypto.randomUUID(),
        timestamp: timestamp ?? Date.now(),
        content,
      }
      const next = [entry, ...prev]
      saveNotes(birdId, next)
      return next
    })
  }, [birdId])

  const removeNote = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id)
      saveNotes(birdId, next)
      return next
    })
  }, [birdId])

  const clearAll = useCallback(() => {
    setEntries([])
    saveNotes(birdId, [])
  }, [birdId])

  return { entries, addNote, removeNote, clearAll }
}
