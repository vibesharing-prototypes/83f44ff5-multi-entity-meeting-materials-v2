'use client'

import { useState, useCallback, useRef } from 'react'
import Sidebar from '@/components/Sidebar'

export default function HomeSidePanel() {
  const [isOpen, setIsOpen] = useState(true)
  const [hasActivity, setHasActivity] = useState(false)
  const isOpenRef = useRef(true)

  const toggle = useCallback(() => {
    setIsOpen(prev => {
      const next = !prev
      isOpenRef.current = next
      if (next) setHasActivity(false)
      return next
    })
  }, [])

  const handleNewActivity = useCallback(() => {
    if (!isOpenRef.current) {
      setHasActivity(true)
    }
  }, [])

  return (
    <aside
      className={`flex-shrink-0 border-l border-slate-200 dark:border-zinc-800 flex flex-col overflow-hidden transition-[width] duration-300 ease-in-out ${isOpen ? 'w-80' : 'w-10'}`}
    >
      <Sidebar
        isOpen={isOpen}
        onToggle={toggle}
        hasActivity={hasActivity}
        onNewActivity={handleNewActivity}
      />
    </aside>
  )
}
