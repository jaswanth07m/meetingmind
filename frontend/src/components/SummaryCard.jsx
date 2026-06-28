export default function SummaryCard({ summary }) {
  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
        </div>
        <h3 className="text-white font-semibold">Summary</h3>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">
        {summary || 'No summary available.'}
      </p>
    </div>
  );
}