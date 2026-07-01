import { useState } from 'react';

export default function JsonViewer({ data, label = 'JSON Output' }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card p-5 sm:p-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between gap-3 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center">
            <svg className="w-4.5 h-4.5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-white font-semibold leading-tight">{label}</h3>
            <p className="text-slate-500 text-xs">{expanded ? 'Click to collapse' : 'Click to expand'}</p>
          </div>
        </div>
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/50 group-hover:border-emerald-400/40 transition-colors duration-200">
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>

      {expanded && (
        <div className="mt-4 rounded-xl border border-slate-700/40 overflow-hidden">
          {/* Editor-style top bar */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900/80 border-b border-slate-700/40">
            <span className="w-3 h-3 rounded-full bg-red-400/70" />
            <span className="w-3 h-3 rounded-full bg-amber-400/70" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
            <span className="ml-2 text-xs text-slate-500 font-mono">results.json</span>
          </div>
          <pre className="bg-slate-950/70 p-4 text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto max-h-96 overflow-y-auto scrollbar-thin">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
