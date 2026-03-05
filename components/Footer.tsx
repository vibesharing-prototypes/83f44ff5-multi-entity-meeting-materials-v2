export default function Footer() {
  return (
    <footer className="mt-24 px-6 py-8">
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-zinc-800 mb-8" />
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.18em] text-slate-400 dark:text-zinc-600 uppercase">Multi-Entity Meeting Materials</span>
        <span className="text-[11px] text-slate-300 dark:text-zinc-700">© {new Date().getFullYear()} Diligent Corporation</span>
      </div>
    </footer>
  )
}
