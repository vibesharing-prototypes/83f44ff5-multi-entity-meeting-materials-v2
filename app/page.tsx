import type { Metadata } from 'next'
import ContextBar from '@/components/ContextBar'
import HomeContent from '@/components/HomeContent'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = { title: 'Home' }

export default function Home() {
  return (
    <div className="flex h-full overflow-hidden bg-white dark:bg-zinc-950">
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <ContextBar />
        <HomeContent />
      </main>
      <aside className="w-80 flex-shrink-0 border-l border-slate-200 dark:border-zinc-800 flex flex-col">
        <Sidebar />
      </aside>
    </div>
  )
}
