'use client'

import { createContext, useContext, useCallback, useState, type ReactNode } from 'react'

export type AgentJobType = 'edit' | 'action'

export interface AgentJob {
  id: string
  type: AgentJobType
  entityId: number
  entityShortName: string
  title: string
  /** Section title for edit jobs (e.g. "Risk & Compliance") */
  sectionTitle?: string
  /** Section index for edit URL; derived from sectionTitle when provided */
  sectionIndex?: number
  status: 'running' | 'done'
  startedAt: number
  /** Ordered step labels to display in the progress widget */
  workflowSteps?: string[]
}

interface AgentActivityContextValue {
  jobs: AgentJob[]
  addJob: (job: Omit<AgentJob, 'id' | 'status' | 'startedAt'>) => string
  completeJob: (id: string) => void
  removeJob: (id: string) => void
}

const AgentActivityContext = createContext<AgentActivityContextValue | null>(null)

export function useAgentActivity() {
  const ctx = useContext(AgentActivityContext)
  if (!ctx) return null
  return ctx
}

interface AgentActivityProviderProps {
  children: ReactNode
  /** Resolve section title to index for edit URL */
  getSectionIndex?: (title: string) => number | undefined
}

export function AgentActivityProvider({ children, getSectionIndex }: AgentActivityProviderProps) {
  const [jobs, setJobs] = useState<AgentJob[]>([])

  const addJob = useCallback(
    (job: Omit<AgentJob, 'id' | 'status' | 'startedAt'>): string => {
      const id = `job-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      const sectionIndex =
        job.sectionTitle && getSectionIndex
          ? getSectionIndex(job.sectionTitle)
          : undefined
      const newJob: AgentJob = {
        ...job,
        id,
        status: 'running',
        startedAt: Date.now(),
        sectionIndex,
      }
      setJobs(prev => [...prev, newJob])
      return id
    },
    [getSectionIndex]
  )

  const completeJob = useCallback((id: string) => {
    setJobs(prev =>
      prev.map(j => (j.id === id ? { ...j, status: 'done' as const } : j))
    )
  }, [])

  const removeJob = useCallback((id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id))
  }, [])

  return (
    <AgentActivityContext.Provider
      value={{ jobs, addJob, completeJob, removeJob }}
    >
      {children}
    </AgentActivityContext.Provider>
  )
}
