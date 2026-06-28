import { useState } from 'react';

export default function JsonViewer({ data, label = 'JSON Output' }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card p-5 sm:p-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
          </div>
          <h3 className="text-white font-semibold">{label}</h3>
        </div>
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
      </button>

      {expanded && (
        <div className="mt-4">
          <pre className="bg-slate-900/50 rounded-lg p-4 text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto max-h-96 overflow-y-auto scrollbar-thin">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}