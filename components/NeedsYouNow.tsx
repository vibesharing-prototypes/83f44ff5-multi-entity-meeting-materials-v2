'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ACTION_ITEMS, ENTITIES, type ActionItem } from '@/components/data'
import EntityLogo from '@/components/EntityLogo'
import { useAgentActivity } from '@/components/AgentActivityContext'
import { useProtoState } from '@/components/ProtoStateContext'

function LogoWithTooltip({ entityId }: { entityId: number }) {
  const entity = ENTITIES.find(e => e.id === entityId)!
  return (
    <div className="relative group/logo flex-shrink-0">
      <EntityLogo entity={entity} size="sm" />
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 bg-slate-800 rounded-lg shadow-md opacity-0 group-hover/logo:opacity-100 transition-opacity z-20 whitespace-nowrap">
        <p className="text-[11px] font-semibold text-white leading-snug">{entity.name}</p>
        <p className="text-[10px] text-slate-400 leading-snug">{entity.country}</p>
      </div>
    </div>
  )
}

function ActionItemModal({ item, onClose }: { item: ActionItem; onClose: () => void }) {
  const entity = ENTITIES.find(e => e.id === item.entityId)!
  const agentActivity = useAgentActivity()

  function handleRunInBackground() {
    if (agentActivity) {
      const jobId = agentActivity.addJob({
        type: 'action',
        entityId: entity.id,
        entityShortName: entity.shortName,
        title: item.title,
      })
      setTimeout(() => {
        agentActivity.completeJob(jobId)
        setTimeout(() => agentActivity.removeJob(jobId), 4000)
      }, 3000)
    }
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-[2px]" />
      <div
        className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 active:bg-slate-300 dark:active:bg-zinc-600 transition-colors flex items-center justify-center"
          aria-label="Close"
        >
          <svg className="w-3.5 h-3.5 text-slate-600 dark:text-zinc-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        <div className="px-6 pt-6 pb-5">
          {/* Entity */}
          <div className="flex items-center gap-3 mb-5 pr-8">
            <EntityLogo entity={entity} size="md" />
            <div className="min-w-0">
              <p className="text-[11px] text-slate-400 leading-snug">{entity.country}</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-zinc-100 leading-snug truncate">{entity.name}</p>
            </div>
          </div>

          {/* Badge */}
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[10px] font-semibold uppercase tracking-wide">
            Action Required
          </span>

          {/* Title */}
          <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100 mt-3 mb-2 leading-snug">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="text-sm text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            {agentActivity && (
              <button
                type="button"
                onClick={handleRunInBackground}
                className="text-sm text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200 underline underline-offset-2 transition-colors"
              >
                Run in background
              </button>
            )}
            <Link
              href={`/entity/${item.entityId}`}
              className="px-4 py-2 bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-slate-700 dark:hover:bg-white active:bg-slate-800 dark:active:bg-zinc-200 transition-colors"
            >
              {item.actionLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const VISIBLE_COUNT = 3

export default function NeedsYouNow() {
  const [selectedItem, setSelectedItem] = useState<ActionItem | null>(null)
  const [showAll, setShowAll] = useState(false)
  const state = useProtoState()

  const stateItems = ACTION_ITEMS.filter(i => i.states.includes(state))
  const visibleItems = showAll ? stateItems : stateItems.slice(0, VISIBLE_COUNT)
  const hasMore = stateItems.length > VISIBLE_COUNT

  return (
    <section className="flex flex-col">
      <div className="mb-3">
        <h2 className="text-xs font-semibold text-slate-800 dark:text-zinc-200 uppercase tracking-wide">
          Action Items
        </h2>
        <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">
          Make a decision – the agent will complete the task for you.
        </p>
      </div>
      <div className="flex-1 rounded-lg border border-slate-200 dark:border-zinc-700 divide-y divide-slate-100 dark:divide-zinc-800 flex flex-col">
        {visibleItems.map((item, i) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={`flex items-center gap-3 px-4 h-[76px] overflow-hidden bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 active:bg-slate-100 dark:active:bg-zinc-700 cursor-pointer transition-colors ${
              i === 0 ? 'rounded-t-lg' : ''
            } ${!hasMore && i === visibleItems.length - 1 ? 'rounded-b-lg' : ''}`}
          >
            <LogoWithTooltip entityId={item.entityId} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-900 dark:text-zinc-100 leading-snug truncate">
                {item.title}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5 leading-snug line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
        {hasMore && (
          <button
            onClick={() => setShowAll(v => !v)}
            className="flex items-center justify-center gap-1 w-full py-2.5 text-[11px] font-medium text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors rounded-b-lg"
          >
            {showAll ? 'Show less' : `Show ${stateItems.length - VISIBLE_COUNT} more`}
            <svg className={`w-3 h-3 transition-transform ${showAll ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 4l4 4 4-4" />
            </svg>
          </button>
        )}
      </div>
      {selectedItem && (
        <ActionItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  )
}
