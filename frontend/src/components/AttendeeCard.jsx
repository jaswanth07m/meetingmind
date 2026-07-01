/**
 * AttendeeCard — displays a list of meeting attendees.
 * Each attendee gets an avatar generated from their initials.
 */
export default function AttendeeCard({ attendees = [] }) {
  const initials = (name) =>
    name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  // Cycle through a small palette so avatars feel distinct
  const colors = [
    'from-cyan-500 to-blue-600',
    'from-purple-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-violet-500 to-purple-600',
  ];

  return (
    <div className="glass-card h-full flex flex-col p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/20 flex items-center justify-center">
            <svg
              className="w-4.5 h-4.5 text-blue-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>
          <h3 className="text-white font-semibold">Attendees</h3>
        </div>
        {attendees.length > 0 && (
          <span className="text-xs text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-full border border-slate-700/50">
            {attendees.length} {attendees.length === 1 ? 'person' : 'people'}
          </span>
        )}
      </div>

      {/* Content */}
      {attendees.length > 0 ? (
        <div className="flex flex-wrap gap-2.5">
          {attendees.map((name, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 hover:border-blue-400/40 hover:bg-slate-800/80 transition-all duration-200"
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${colors[idx % colors.length]} flex items-center justify-center flex-shrink-0 ring-2 ring-slate-900/40 group-hover:scale-105 transition-transform duration-200`}
              >
                <span className="text-white text-xs font-bold leading-none">
                  {initials(name)}
                </span>
              </div>
              <span className="text-sm text-slate-200 font-medium">{name}</span>
            </div>
          ))}
        </div>
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <p className="text-slate-500 text-sm">No attendees identified.</p>
        </div>
      )}
    </div>
  );
}
