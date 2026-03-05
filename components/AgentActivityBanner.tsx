'use client'

import { ACTION_ITEMS } from '@/components/data'
import { useProtoState } from '@/components/ProtoStateContext'

type ProtoState = 'calm' | 'busy' | 'critical'

interface MetricDef {
  value: string
  label: string
  numClass: string
  boxClass: string
}

interface StateConfig {
  pillLabel: string
  pillDot: string
  pillText: string
  pillBorder: string
  pillBg: string
  glowClass: string
  cardBorder: string
  headline: string
  subtext: string
  metrics: MetricDef[]
  workflow: string[] | null
  wfComplete: number
  wfCurrent: number
}

const CONFIGS: Record<ProtoState, StateConfig> = {
  calm: {
    pillLabel: 'Agents Monitoring — All Clear',
    pillDot: 'bg-emerald-400',
    pillText: 'text-emerald-700 dark:text-emerald-300',
    pillBorder: 'border-emerald-200 dark:border-emerald-800/60',
    pillBg: 'bg-emerald-50 dark:bg-emerald-950/50',
    glowClass: 'hero-glow-calm',
    cardBorder: 'border-slate-200 dark:border-zinc-800',
    headline: 'All quiet — nothing requires your attention today.',
    subtext: "Agents are monitoring all entities and nothing is pressing. A good time to explore features you haven't tried yet — like batch pack creation or the cross-entity consistency check.",
    metrics: [
      { value: '8', label: 'Entities Active', numClass: 'text-blue-600 dark:text-blue-400', boxClass: 'border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/30' },
      { value: '3', label: 'Packs Approved', numClass: 'text-emerald-600 dark:text-emerald-400', boxClass: 'border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/30' },
      { value: '0', label: 'Items Pending', numClass: 'text-slate-500 dark:text-zinc-400', boxClass: 'border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/30' },
    ],
    workflow: null,
    wfComplete: 0,
    wfCurrent: -1,
  },
  busy: {
    pillLabel: 'Action Required',
    pillDot: 'bg-amber-400',
    pillText: 'text-amber-700 dark:text-amber-300',
    pillBorder: 'border-amber-200 dark:border-amber-800/60',
    pillBg: 'bg-amber-50 dark:bg-amber-950/50',
    glowClass: 'hero-glow-busy',
    cardBorder: 'border-amber-200/60 dark:border-amber-900/40',
    headline: '{total} items are waiting for review.',
    subtext: 'Several items are time-sensitive. Review flagged documents before your next board meeting.',
    metrics: [
      { value: '{total}', label: 'Pending Review', numClass: 'text-amber-600 dark:text-amber-400', boxClass: 'border-amber-100 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/30' },
      { value: '2', label: 'High Priority', numClass: 'text-red-600 dark:text-red-400', boxClass: 'border-red-100 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/30' },
      { value: '4', label: 'Entities Affected', numClass: 'text-blue-600 dark:text-blue-400', boxClass: 'border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/30' },
    ],
    workflow: ['Flagged', 'In Review', 'Approved', 'Published'],
    wfComplete: 0,
    wfCurrent: 1,
  },
  critical: {
    pillLabel: 'Agents Detected Emerging Risks',
    pillDot: 'bg-red-400',
    pillText: 'text-red-700 dark:text-red-300',
    pillBorder: 'border-red-200 dark:border-red-900/60',
    pillBg: 'bg-red-50 dark:bg-red-950/60',
    glowClass: 'hero-glow-critical',
    cardBorder: 'border-red-200/60 dark:border-red-900/50',
    headline: '{total} risks require disclosure review.',
    subtext: 'Your monitoring agents detected emerging risks that may not be adequately disclosed in current SEC filings or Board meeting materials. Review recommended before the Feb 28 Board meeting.',
    metrics: [
      { value: '1', label: 'Critical', numClass: 'text-red-600 dark:text-red-400', boxClass: 'border-red-100 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/30' },
      { value: '2', label: 'High', numClass: 'text-amber-600 dark:text-amber-400', boxClass: 'border-amber-100 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/30' },
      { value: '3', label: 'Filings Affected', numClass: 'text-blue-600 dark:text-blue-400', boxClass: 'border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/30' },
    ],
    workflow: ['Risk Detected', 'Assess & Prioritize', 'Draft Updates', 'Legal Review', 'Notify Board', 'File/Disclose'],
    wfComplete: 0,
    wfCurrent: 1,
  },
}

function CheckIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6l3 3 5-5" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2l4 4-4 4" />
    </svg>
  )
}

export default function AgentActivityBanner() {
  const state = useProtoState()
  const cfg = CONFIGS[state]
  const items = ACTION_ITEMS.filter(i => i.states.includes(state))
  const total = items.length

  const headline = cfg.headline.replace('{total}', String(total))
  const metrics = cfg.metrics.map(m => ({
    ...m,
    value: m.value.replace('{total}', String(total)),
  }))

  return (
    <div className={`relative rounded-2xl border overflow-hidden bg-white dark:bg-[#0b0d10] ${cfg.cardBorder}`}>
      {/* Glow overlay */}
      <div className={`hero-glow ${cfg.glowClass}`} aria-hidden />

      <div className="relative px-8 pt-8 pb-7">
        {/* Status pill */}
        <div className="flex justify-center mb-5">
          <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium ${cfg.pillText} ${cfg.pillBorder} ${cfg.pillBg}`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.pillDot}`} />
            {cfg.pillLabel}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-3">
          {headline}
        </h2>

        {/* Subtext */}
        <p className="text-center text-sm text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-7">
          {cfg.subtext}
        </p>

        {/* Metrics */}
        <div className="flex justify-center gap-4 mb-7">
          {metrics.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center w-28 h-20 rounded-xl border ${m.boxClass}`}
            >
              <span className={`text-3xl font-bold leading-none mb-1.5 ${m.numClass}`}>{m.value}</span>
              <span className="text-[11px] text-slate-500 dark:text-zinc-500 font-medium">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 dark:bg-zinc-800 mb-5" />

        {/* Workflow */}
        {cfg.workflow ? (
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 dark:text-zinc-600">
              Response Workflow
            </span>
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {cfg.workflow.map((step, i) => {
                const isComplete = i < cfg.wfComplete
                const isCurrent = i === cfg.wfCurrent

                return (
                  <div key={i} className="flex items-center gap-1.5">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                        isComplete
                          ? 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                          : isCurrent
                          ? 'border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                          : 'border-slate-200 dark:border-zinc-800 bg-transparent text-slate-400 dark:text-zinc-600'
                      }`}
                    >
                      {isComplete && (
                        <span className="text-emerald-500 dark:text-emerald-400">
                          <CheckIcon />
                        </span>
                      )}
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      )}
                      {step}
                    </div>
                    {i < cfg.workflow!.length - 1 && (
                      <span className="text-slate-300 dark:text-zinc-700">
                        <ChevronRight />
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <p className="text-center text-xs text-slate-400 dark:text-zinc-600">
            No items require review. Agents are running normally.
          </p>
        )}
      </div>
    </div>
  )
}
