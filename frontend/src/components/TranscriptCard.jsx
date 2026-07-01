export default function TranscriptCard({ transcript }) {
  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center">
            <svg className="w-4.5 h-4.5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-semibold leading-tight">Transcript</h3>
            <p className="text-slate-500 text-xs">Full recording text</p>
          </div>
        </div>
      </div>
      <div className="relative rounded-xl bg-slate-900/60 border border-slate-700/40 max-h-64 overflow-y-auto scrollbar-thin">
        <div className="p-4">
          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
            {transcript || 'No transcript available.'}
          </p>
        </div>
        {/* Fade-out at bottom to hint scrollability */}
        <div className="pointer-events-none sticky bottom-0 h-8 bg-gradient-to-t from-slate-900/80 to-transparent rounded-b-xl" aria-hidden="true" />
      </div>
    </div>
  );
}
