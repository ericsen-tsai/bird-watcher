import { useState } from 'react'
import { ClipboardCopy, Download, Plus, Trash2, X } from 'lucide-react'
import { useNotes } from '#/hooks/useNotes'
import { exportAsMarkdown, exportAsCSV } from '#/lib/notes-store'
import { useBird } from '#/context/BirdContext'

export default function NotesPanel() {
  const { activeBirdId, activeBird } = useBird()
  const { entries, addNote, removeNote, clearAll } = useNotes(activeBirdId)
  const [content, setContent] = useState('')

  function handleAdd() {
    if (!content.trim()) return
    addNote(content.trim())
    setContent('')
  }

  function handleCopyMarkdown() {
    const md = exportAsMarkdown(entries, activeBird.commonName)
    navigator.clipboard.writeText(md)
  }

  function handleDownloadCSV() {
    const csv = exportAsCSV(entries)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeBird.commonName}-notes-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-forest-800 px-3 py-2">
        <span className="text-xs font-semibold text-forest-200">
          筆記
          <span className="ml-1.5 text-forest-500">({entries.length})</span>
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="rounded p-1 text-forest-500 transition hover:bg-forest-800 hover:text-forest-300"
            title="複製為 Markdown"
            disabled={entries.length === 0}
          >
            <ClipboardCopy className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleDownloadCSV}
            className="rounded p-1 text-forest-500 transition hover:bg-forest-800 hover:text-forest-300"
            title="下載 CSV"
            disabled={entries.length === 0}
          >
            <Download className="h-3.5 w-3.5" />
          </button>
          {entries.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="rounded p-1 text-red-400/60 transition hover:bg-red-900/20 hover:text-red-400"
              title="清除全部"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Compose form */}
      <div className="border-b border-forest-800 px-3 py-2">
        <div className="flex gap-1.5">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                handleAdd()
              }
            }}
            placeholder="輸入筆記..."
            rows={2}
            className="flex-1 resize-none rounded-md border border-forest-700 bg-forest-900 px-2 py-1.5 text-xs text-forest-200 placeholder:text-forest-600 focus:border-amber-500/50 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="self-end rounded-md bg-amber-500/20 px-2.5 py-1.5 text-xs font-medium text-amber-400 transition hover:bg-amber-500/30"
            disabled={!content.trim()}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Entries list */}
      <div className="flex-1 overflow-y-auto">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="text-2xl">📝</span>
            <p className="mt-2 text-xs text-forest-500">尚無筆記</p>
            <p className="mt-0.5 text-[10px] text-forest-600">
              輸入內容後按 <kbd className="rounded bg-forest-800 px-1 font-mono">Ctrl+Enter</kbd> 新增
            </p>
          </div>
        ) : (
          <ul className="m-0 list-none divide-y divide-forest-800/40 p-0">
            {entries.map((entry) => {
              const d = new Date(entry.timestamp)
              return (
                <li key={entry.id} className="group flex items-start gap-2 px-3 py-2 transition hover:bg-forest-800/20">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] text-forest-500">
                        {d.toLocaleDateString('zh-TW')}
                      </span>
                      <span className="text-[10px] text-forest-600">
                        {d.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="m-0 mt-0.5 whitespace-pre-wrap text-xs text-forest-300">{entry.content}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeNote(entry.id)}
                    className="mt-0.5 shrink-0 rounded p-0.5 text-forest-700 opacity-0 transition group-hover:opacity-100 hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
