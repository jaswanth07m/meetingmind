export default function SummaryCard({ summary }) {
  return (
    <div className="glass-card overflow-hidden">
      {/* Accent header strip */}
      <div className="flex items-center gap-3 px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-slate-700/40">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-4.5 h-4.5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
        </div>
        <div className="min-w-0">
          <h3 className="text-white font-semibold leading-tight">Summary</h3>
          <p className="text-slate-500 text-xs">Key takeaways at a glance</p>
        </div>
      </div>

      <div className="px-5 sm:px-6 py-5">
        <p className="text-slate-300 text-[0.95rem] leading-relaxed text-pretty">
          {summary || 'No summary available.'}
        </p>
      </div>
    </div>
  );
}
