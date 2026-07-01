import { useHealth } from '../hooks/useHealth';

export default function Navbar() {
  const { status } = useHealth();

  const statusLabel = {
    checking: 'Checking...',
    healthy: 'Connected',
    unhealthy: 'Disconnected',
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div className="absolute -inset-1 rounded-xl bg-cyan-500/25 blur-md -z-10" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-white">Meeting</span>
              <span className="text-gradient">Mind</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="text-xs font-medium text-slate-400 hidden sm:inline">Backend</span>
            <div className={`health-dot ${status}`} />
            <span className="text-xs font-medium text-slate-300 min-w-[80px]">
              {statusLabel[status]}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
