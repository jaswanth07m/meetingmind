/**
 * LandingPage — hero, feature cards, staggered entrance animations.
 * Presentational only; calls onUploadClick to navigate.
 */
export default function LandingPage({ onUploadClick }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16">
      <div className="text-center max-w-2xl mx-auto w-full">

        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <div className="mb-8 flex justify-center animate-fade-in">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            {/* ambient glow */}
            <div className="absolute -inset-6 bg-cyan-500/15 rounded-full blur-2xl -z-10 pointer-events-none" />
          </div>
        </div>

        {/* ── Headline ─────────────────────────────────────────────────── */}
        <div className="animate-fade-in-up delay-100">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-3">
            <span className="text-white">Meeting</span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Mind</span>
          </h1>
          <p className="text-lg sm:text-xl text-cyan-400 font-medium mb-5 tracking-wide">
            Offline Meeting Intelligence
          </p>
        </div>

        {/* ── Description ──────────────────────────────────────────────── */}
        <p className="animate-fade-in-up delay-200 text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg mx-auto mb-10">
          Transcribe and analyze your meeting recordings entirely on-device.
          No cloud. No subscriptions. No data leaves your machine.
          Powered by&nbsp;
          <span className="text-slate-300 font-medium">whisper.cpp</span> and&nbsp;
          <span className="text-slate-300 font-medium">llama.cpp</span>.
        </p>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <div className="animate-fade-in-up delay-300 flex flex-col items-center gap-4 mb-16">
          <button
            onClick={onUploadClick}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl
              bg-gradient-to-r from-cyan-500 to-blue-600
              text-white font-semibold text-base
              shadow-lg shadow-cyan-500/25
              hover:shadow-xl hover:shadow-cyan-500/40
              hover:scale-105 active:scale-100
              transition-all duration-300"
          >
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-3 3m3-3l3 3M5 20h14" />
            </svg>
            Upload a Recording
          </button>

          <p className="text-slate-500 text-sm">
            MP3 or WAV · runs 100% on your CPU
          </p>
        </div>

        {/* ── Feature cards ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              delay: 'delay-400',
              color: 'text-cyan-400',
              bg:    'bg-cyan-500/10',
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              ),
              title: 'Transcribe',
              sub:   'Whisper AI · speech-to-text',
            },
            {
              delay: 'delay-500',
              color: 'text-purple-400',
              bg:    'bg-purple-500/10',
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              ),
              title: 'Analyze',
              sub:   'Llama AI · insights & actions',
            },
            {
              delay: 'delay-600',
              color: 'text-emerald-400',
              bg:    'bg-emerald-500/10',
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              ),
              title: 'Private',
              sub:   '100% offline · CPU only',
            },
          ].map(({ delay, color, bg, icon, title, sub }) => (
            <div key={title} className={`animate-fade-in-up ${delay} glass-card px-5 py-4 text-left`}>
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <svg className={`w-5 h-5 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  {icon}
                </svg>
              </div>
              <p className={`${color} text-sm font-semibold`}>{title}</p>
              <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}