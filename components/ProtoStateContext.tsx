'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { ProtoState } from '@/components/data'

const ProtoStateContext = createContext<ProtoState>('calm')

export function ProtoStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProtoState>('calm')

  useEffect(() => {
    function handle(e: Event) {
      const s = (e as CustomEvent<{ state: string }>).detail.state
      if (s === 'calm' || s === 'busy' || s === 'critical') setState(s)
    }
    document.addEventListener('proto:state', handle)
    return () => document.removeEventListener('proto:state', handle)
  }, [])

  return <ProtoStateContext.Provider value={state}>{children}</ProtoStateContext.Provider>
}

export const useProtoState = () => useContext(ProtoStateContext)
