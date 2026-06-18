import type { BirdId } from './birds'

export interface NoteEntry {
  id: string
  timestamp: number
  content: string
}

function storageKey(birdId: BirdId): string {
  return `bird-watcher-notes-${birdId}`
}

export function loadNotes(birdId: BirdId): NoteEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(storageKey(birdId))
    if (raw) return JSON.parse(raw)

    // One-time migration from old observation format
    if (birdId === 'goshawk') {
      const oldRaw = localStorage.getItem('bird-watcher-observations')
      if (oldRaw) {
        const old = JSON.parse(oldRaw) as Array<{
          id: string
          timestamp: number
          type: string
          note: string
        }>
        const migrated: NoteEntry[] = old.map((entry) => ({
          id: entry.id,
          timestamp: entry.timestamp,
          content: entry.note || entry.type,
        }))
        saveNotes(birdId, migrated)
        localStorage.removeItem('bird-watcher-observations')
        return migrated
      }
    }

    return []
  } catch {
    return []
  }
}

export function saveNotes(birdId: BirdId, entries: NoteEntry[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(storageKey(birdId), JSON.stringify(entries))
}

export function exportAsMarkdown(entries: NoteEntry[], birdName: string): string {
  const date = new Date().toLocaleDateString('zh-TW')
  const lines = [
    `# ${birdName}筆記 — ${date}`,
    '',
    '| 日期 | 時間 | 筆記 |',
    '|------|------|------|',
  ]

  for (const entry of entries) {
    const d = new Date(entry.timestamp)
    const dateStr = d.toLocaleDateString('zh-TW')
    const timeStr = d.toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
    })
    const content = entry.content.replace(/\|/g, '\\|')
    lines.push(`| ${dateStr} | ${timeStr} | ${content} |`)
  }

  return lines.join('\n')
}

export function exportAsCSV(entries: NoteEntry[]): string {
  const lines = ['timestamp,date,time,content']
  for (const entry of entries) {
    const d = new Date(entry.timestamp)
    const dateStr = d.toLocaleDateString('zh-TW')
    const timeStr = d.toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
    })
    const escaped = entry.content.replace(/"/g, '""')
    lines.push(`${d.toISOString()},${dateStr},${timeStr},"${escaped}"`)
  }
  return lines.join('\n')
}
