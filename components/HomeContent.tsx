'use client'

import { useMemo } from 'react'
import { SECTIONS } from '@/components/sections'
import { AgentActivityProvider } from '@/components/AgentActivityContext'
import AgentActivityBanner from '@/components/AgentActivityBanner'
import NeedsYouNow from '@/components/NeedsYouNow'
import EditSuggestions from '@/components/EditSuggestions'
import AgentUsecaseHeroes from '@/components/AgentUsecaseHeroes'
import Footer from '@/components/Footer'
import { ProtoStateProvider } from '@/components/ProtoStateContext'

function getSectionIndex(title: string): number | undefined {
  const i = SECTIONS.findIndex(s => s.title === title)
  return i >= 0 ? i : undefined
}

export default function HomeContent() {
  const getSectionIndexCb = useMemo(() => getSectionIndex, [])

  return (
    <ProtoStateProvider>
      <AgentActivityProvider getSectionIndex={getSectionIndexCb}>
        <div className="flex-1 overflow-y-auto px-6 py-4 home-gradient">
          <div className="mb-6">
            <AgentActivityBanner />
          </div>
          <div className="grid grid-cols-2 gap-6 items-stretch">
            <NeedsYouNow />
            <EditSuggestions />
          </div>
          <AgentUsecaseHeroes />
          <Footer />
        </div>
      </AgentActivityProvider>
    </ProtoStateProvider>
  )
}
