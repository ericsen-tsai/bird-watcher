import { useState } from 'react'
import { ChevronDown, ChevronRight, Shield, MapPin, Egg } from 'lucide-react'
import { useBird } from '#/context/BirdContext'

type Section = 'traits' | 'diet' | 'breeding' | 'banded' | 'facts'

export default function SpeciesPanel() {
  const [expanded, setExpanded] = useState<Set<Section>>(new Set(['traits', 'breeding']))
  const { activeBird } = useBird()

  function toggle(section: Section) {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(section) ? next.delete(section) : next.add(section)
      return next
    })
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="border-b border-forest-800 p-4">
        <h2 className="m-0 text-lg font-bold text-forest-100">{activeBird.commonName}</h2>
        <p className="m-0 mt-0.5 text-xs italic text-forest-500">{activeBird.scientificName}</p>
        <p className="m-0 text-xs text-forest-500">{activeBird.englishName}</p>

        <div className="mt-2 flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs font-medium text-amber-400">{activeBird.conservationStatus}</span>
        </div>

        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-forest-400">
          <MapPin className="h-3 w-3" />
          {activeBird.habitat}
        </div>
      </div>

      {/* Breeding timeline */}
      <div className="border-b border-forest-800 px-4 py-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-forest-300">
          <Egg className="h-3.5 w-3.5" />
          繁殖時程
        </div>
        <div className="mt-2 flex gap-1">
          {activeBird.breedingTimeline.map((phase) => {
            const now = new Date().getMonth() + 1
            const [startStr] = phase.months.split('–')
            const startMonth = parseInt(startStr, 10)
            const isActive = now >= startMonth && now <= startMonth + 1
            return (
              <div
                key={phase.label}
                className={`flex flex-1 flex-col items-center rounded-md px-1 py-1.5 text-center transition ${isActive ? 'bg-amber-500/15 ring-1 ring-amber-500/30' : 'bg-forest-800/50'}`}
              >
                <span className="text-sm">{phase.icon}</span>
                <span className="mt-0.5 text-[10px] font-medium text-forest-200">{phase.label}</span>
                <span className="text-[9px] text-forest-500">{phase.months}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Collapsible sections */}
      <div className="flex-1 overflow-y-auto">
        <CollapsibleSection
          title="外觀特徵"
          expanded={expanded.has('traits')}
          onToggle={() => toggle('traits')}
        >
          <ul className="m-0 list-none space-y-1 p-0">
            {activeBird.physicalTraits.map((t) => (
              <li key={t} className="text-xs text-forest-300">• {t}</li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection
          title="食性"
          expanded={expanded.has('diet')}
          onToggle={() => toggle('diet')}
        >
          <ul className="m-0 list-none space-y-1 p-0">
            {activeBird.diet.map((d) => (
              <li key={d} className="text-xs text-forest-300">• {d}</li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection
          title="繁殖資訊"
          expanded={expanded.has('breeding')}
          onToggle={() => toggle('breeding')}
        >
          <dl className="m-0 grid grid-cols-2 gap-x-4 gap-y-1.5">
            {Object.entries({
              '繁殖季': activeBird.breeding.season,
              '孵化期': activeBird.breeding.incubation,
              '離巢': activeBird.breeding.fledging,
              '窩卵數': activeBird.breeding.clutchSize,
            }).map(([label, value]) => (
              <div key={label}>
                <dt className="text-[10px] font-medium text-forest-500">{label}</dt>
                <dd className="m-0 text-xs text-forest-300">{value}</dd>
              </div>
            ))}
          </dl>
        </CollapsibleSection>

        {activeBird.bandedIndividuals && activeBird.bandedIndividuals.length > 0 && (
          <CollapsibleSection
            title="已知繫放個體"
            expanded={expanded.has('banded')}
            onToggle={() => toggle('banded')}
          >
            <div className="space-y-1.5">
              {activeBird.bandedIndividuals.map((b) => (
                <div key={b.id} className="flex items-baseline gap-2">
                  <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-400">{b.id}</span>
                  <span className="text-xs text-forest-400">{b.description}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        <CollapsibleSection
          title="趣知識"
          expanded={expanded.has('facts')}
          onToggle={() => toggle('facts')}
        >
          <ul className="m-0 list-none space-y-1.5 p-0">
            {activeBird.funFacts.map((f) => (
              <li key={f} className="text-xs text-forest-300">💡 {f}</li>
            ))}
          </ul>
        </CollapsibleSection>
      </div>
    </div>
  )
}

function CollapsibleSection({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-forest-800/60">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-1.5 bg-transparent px-4 py-2.5 text-left text-xs font-semibold text-forest-200 transition hover:bg-forest-800/30"
      >
        {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        {title}
      </button>
      {expanded && <div className="px-4 pb-3">{children}</div>}
    </div>
  )
}
