export default function TopNav() {
  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 flex-shrink-0 flex items-center px-6 py-3.5 justify-between">
      {/* Left: logo mark + app title */}
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 210 222" className="h-7 w-auto" xmlns="http://www.w3.org/2000/svg">
          <path fill="#EE312E" d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z"/>
          <path fill="#AF292E" d="M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z"/>
          <path fill="#D3222A" d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66C107.95,219.89,142.75,12.83,142.75,12.83z"/>
        </svg>
        <span className="text-slate-900 dark:text-zinc-100 font-medium text-sm tracking-tight">Multi-Entity Meeting Materials</span>
      </div>

      {/* Right: actions + user */}
      <div className="flex items-center gap-2">
        {/* Recent activity */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors">
          <svg className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="2" y1="4" x2="14" y2="4"/>
            <line x1="2" y1="8" x2="14" y2="8"/>
            <line x1="2" y1="12" x2="10" y2="12"/>
          </svg>
          <span className="text-xs text-slate-700 dark:text-zinc-300 font-medium">Recent activity</span>
          <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium">(5)</span>
        </button>

        {/* Bell */}
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors">
          <svg className="w-4 h-4 text-slate-500 dark:text-zinc-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2a5 5 0 0 0-5 5v2.5L1.5 11h13L13 9.5V7a5 5 0 0 0-5-5z"/>
            <path d="M6.5 13a1.5 1.5 0 0 0 3 0"/>
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-1 ring-white dark:ring-zinc-900" />
        </button>

        {/* Three-dot menu */}
        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors">
          <svg className="w-4 h-4 text-slate-500 dark:text-zinc-400" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="8" cy="3.5" r="1.25"/>
            <circle cx="8" cy="8" r="1.25"/>
            <circle cx="8" cy="12.5" r="1.25"/>
          </svg>
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200 dark:bg-zinc-700 mx-1" />

        {/* Avatar + name */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-slate-400 dark:bg-zinc-600 flex items-center justify-center flex-shrink-0 ring-1 ring-slate-200 dark:ring-zinc-700">
            <span className="text-xs font-semibold text-white leading-none">SM</span>
          </div>
          <span className="text-sm text-slate-900 dark:text-zinc-100 font-medium">Sarah Mitchell</span>
        </div>
      </div>
    </nav>
  )
}
