'use client'

import { useEffect } from 'react'

export default function ThemeSync() {
  useEffect(() => {
    function handleTheme(e: Event) {
      const theme = (e as CustomEvent<{ theme: string }>).detail.theme
      document.documentElement.classList.toggle('dark', theme === 'dark')
    }

    document.addEventListener('proto:theme', handleTheme)
    return () => document.removeEventListener('proto:theme', handleTheme)
  }, [])

  return null
}
