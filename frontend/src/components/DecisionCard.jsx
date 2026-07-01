/**
 * DecisionCard — displays key decisions made during the meeting.
 * Each decision is numbered and styled for quick scanning.
 */
export default function DecisionCard({ decisions = [] }) {
  return (
    <div className="glass-card h-full flex flex-col p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 border border-rose-500/20 flex items-center justify-center">
            <svg
              className="w-4.5 h-4.5 text-rose-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>
          <h3 className="text-white font-semibold">Decisions</h3>
        </div>
        {decisions.length > 0 && (
          <span className="text-xs text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-full border border-slate-700/50">
            {decisions.length} recorded
          </span>
        )}
      </div>

      {/* Content */}
      {decisions.length > 0 ? (
        <ol className="space-y-2.5">
          {decisions.map((decision, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 rounded-xl bg-slate-800/40 border border-slate-700/40 px-3.5 py-3 hover:border-rose-400/30 transition-colors duration-200"
            >
              {/* Number badge */}
              <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-rose-500/25 to-pink-500/15 border border-rose-500/25 flex items-center justify-center text-rose-300 text-xs font-bold mt-0.5">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-slate-200 text-sm leading-relaxed text-pretty">{decision}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-8 gap-2">
          <svg
            className="w-9 h-9 text-slate-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-slate-500 text-sm">No decisions recorded.</p>
        </div>
      )}
    </div>
  );
}
