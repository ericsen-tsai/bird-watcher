import { useState } from 'react'
import { Group, Panel, Separator, useDefaultLayout } from 'react-resizable-panels'
import { Info, ClipboardList, GripVertical } from 'lucide-react'
import LiveStreamPlayer from './LiveStreamPlayer'
import SpeciesPanel from './SpeciesPanel'
import NotesPanel from './NotesPanel'

type TabId = 'species' | 'notes'

const tabItems: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'species', label: '物種資訊', icon: <Info className="h-3.5 w-3.5" /> },
  { id: 'notes', label: '筆記', icon: <ClipboardList className="h-3.5 w-3.5" /> },
]

function DesktopLayout({ videoId }: { videoId?: string }) {
  const mainLayout = useDefaultLayout({ id: 'watch-main' })
  const sidebarLayout = useDefaultLayout({ id: 'watch-sidebar' })

  return (
    <Group
      orientation="horizontal"
      defaultLayout={mainLayout.defaultLayout}
      onLayoutChanged={mainLayout.onLayoutChanged}
    >
      <Panel defaultSize={65} minSize={40} id="video">
        <LiveStreamPlayer videoId={videoId} />
      </Panel>
      <Separator className="flex w-1.5 items-center justify-center bg-forest-900 transition hover:bg-forest-700">
        <GripVertical className="h-4 w-4 text-forest-600" />
      </Separator>
      <Panel defaultSize={35} minSize={20} id="sidebar">
        <Group
          orientation="vertical"
          defaultLayout={sidebarLayout.defaultLayout}
          onLayoutChanged={sidebarLayout.onLayoutChanged}
        >
          <Panel defaultSize={45} minSize={15} id="species">
            <SpeciesPanel />
          </Panel>
          <Separator className="flex h-1.5 items-center justify-center bg-forest-900 transition hover:bg-forest-700">
            <GripVertical className="h-3 w-3 rotate-90 text-forest-600" />
          </Separator>
          <Panel defaultSize={55} minSize={15} id="notes">
            <NotesPanel />
          </Panel>
        </Group>
      </Panel>
    </Group>
  )
}

export default function ResizableWatchLayout({ videoId }: { videoId?: string }) {
  const [activeTab, setActiveTab] = useState<TabId>('species')

  return (
    <>
      {/* Desktop: resizable panels */}
      <div className="hidden h-full md:block">
        <DesktopLayout videoId={videoId} />
      </div>

      {/* Mobile: stacked video + tabs */}
      <div className="flex h-full flex-col md:hidden">
        <div className="aspect-video w-full shrink-0">
          <LiveStreamPlayer videoId={videoId} />
        </div>

        <div className="flex shrink-0 border-b border-forest-800 bg-forest-950">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition ${
                activeTab === tab.id
                  ? 'border-b-2 border-amber-500 text-amber-400'
                  : 'text-forest-500 hover:text-forest-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'species' && <SpeciesPanel />}
          {activeTab === 'notes' && <NotesPanel />}
        </div>
      </div>
    </>
  )
}
