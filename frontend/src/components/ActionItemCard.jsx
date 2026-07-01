export default function ActionItemCard({ items = [] }) {
  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20 flex items-center justify-center">
            <svg className="w-4.5 h-4.5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
          </div>
          <h3 className="text-white font-semibold">Action Items</h3>
        </div>
        {items.length > 0 && (
          <span className="text-xs text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-full border border-slate-700/50">
            {items.length} {items.length === 1 ? 'task' : 'tasks'}
          </span>
        )}
      </div>

      {items.length > 0 ? (
        <ol className="relative pl-2">
          {/* Timeline rail */}
          <span className="absolute left-[0.9375rem] top-2 bottom-2 w-px bg-gradient-to-b from-amber-400/50 via-slate-700/60 to-transparent" aria-hidden="true" />
          {items.map((item, idx) => (
            <li key={idx} className="relative flex items-start gap-4 pb-4 last:pb-0">
              {/* Node */}
              <span className="relative z-10 flex-shrink-0 w-7 h-7 rounded-full bg-slate-900 border border-amber-500/40 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
              </span>
              <div className="flex-1 min-w-0 rounded-xl bg-slate-800/40 border border-slate-700/40 px-4 py-3 hover:border-amber-400/30 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[0.65rem] uppercase tracking-wider font-semibold text-amber-300/80">
                    Task {idx + 1}
                  </span>
                </div>
                <span className="text-slate-200 text-sm leading-relaxed text-pretty">{item}</span>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <svg className="w-9 h-9 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-slate-500 text-sm">No action items identified.</p>
        </div>
      )}
    </div>
  );
}
