import { Bird } from 'lucide-react'
import { useBird } from '#/context/BirdContext'
import { BIRDS, BIRD_IDS } from '#/lib/birds'

export default function Header() {
  const { activeBirdId, setActiveBirdId } = useBird()

  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-forest-800 bg-forest-950/90 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-forest-200">
        <Bird className="h-5 w-5 text-amber-500" />
        <span className="hidden text-sm font-bold tracking-tight sm:inline">鳥類直播觀察站</span>
      </div>

      <div className="flex items-center rounded-lg border border-forest-700 bg-forest-900/60 p-0.5">
        {BIRD_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveBirdId(id)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
              activeBirdId === id
                ? 'bg-amber-500/20 text-amber-400'
                : 'text-forest-400 hover:text-forest-200'
            }`}
          >
            {BIRDS[id].commonName}
          </button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <a
          href="https://raptor.org.tw"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden text-xs text-forest-500 no-underline transition hover:text-forest-300 hover:no-underline sm:block"
        >
          台灣猛禽研究會
        </a>
      </div>
    </header>
  )
}
