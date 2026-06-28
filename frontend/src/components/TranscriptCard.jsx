export default function TranscriptCard({ transcript }) {
  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <h3 className="text-white font-semibold">Transcript</h3>
      </div>
      <div className="bg-slate-900/50 rounded-lg p-4 max-h-64 overflow-y-auto scrollbar-thin">
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
          {transcript || 'No transcript available.'}
        </p>
      </div>
    </div>
  );
}