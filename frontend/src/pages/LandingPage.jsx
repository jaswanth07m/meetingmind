/**
 * LandingPage — Premium SaaS redesign.
 * Two-column hero | features row | how-it-works | stats
 * All logic/props unchanged.
 */
export default function LandingPage({ onUploadClick }) {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Navbar ────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <span className="font-bold text-white text-lg tracking-tight">Meeting<span className="text-gradient">Mind</span></span>
            </div>

            {/* Center links */}
            <div className="hidden md:flex items-center gap-6">
              {['Features', 'How it Works', 'Privacy', 'Tech Stack', 'FAQ'].map(l => (
                <a key={l} href="#" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">{l}</a>
              ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Backend Connected
              </div>
              <button
                onClick={onUploadClick}
                className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-3 3m3-3l3 3" />
                </svg>
                Upload Recording
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left column */}
            <div className="animate-fade-in-up">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-xs font-semibold text-cyan-300 tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                100% Offline · No Cloud · Total Privacy
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-balance mb-6 leading-[1.08]">
                <span className="text-white">Your Meetings.</span>
                <br />
                <span className="text-white">Your Insights.</span>
                <br />
                <span className="text-gradient">100% Private.</span>
              </h1>

              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                Upload your meeting recording and get a full AI-generated transcript, summary, action items, and decisions — all processed locally on your CPU. No cloud. No tracking.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  onClick={onUploadClick}
                  className="btn-primary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-white font-semibold text-base"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-3 3m3-3l3 3M5 20h14" />
                  </svg>
                  Upload a Recording
                </button>
                <button className="btn-secondary inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-base">
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>

              <p className="text-slate-500 text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                </svg>
                Supports MP3, WAV · Runs on your CPU
              </p>
            </div>

            {/* Right column — floating step cards */}
            <div className="animate-fade-in-up delay-200 relative hidden lg:flex flex-col gap-4">
              {/* Ambient glow */}
              <div className="absolute -inset-16 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

              {[
                {
                  step: '01',
                  title: 'Transcribe',
                  sub: 'whisper.cpp',
                  desc: 'Whisper converts your meeting audio into accurate text',
                  color: 'from-cyan-500/20 to-blue-500/10',
                  border: 'border-cyan-500/20',
                  dot: 'bg-cyan-400',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  ),
                },
                {
                  step: '02',
                  title: 'Analyze',
                  sub: 'llama.cpp',
                  desc: 'Llama AI extracts insights, actions, and decisions',
                  color: 'from-indigo-500/20 to-purple-500/10',
                  border: 'border-indigo-500/20',
                  dot: 'bg-indigo-400',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  ),
                },
                {
                  step: '03',
                  title: 'Extract',
                  sub: 'Insights & Actions',
                  desc: 'Get structured results: summary, attendees, decisions',
                  color: 'from-emerald-500/20 to-teal-500/10',
                  border: 'border-emerald-500/20',
                  dot: 'bg-emerald-400',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                  ),
                },
              ].map((card, i) => (
                <div
                  key={card.step}
                  className={`glass-card p-5 flex items-center gap-4 ${i === 1 ? 'ml-8' : ''} ${i === 2 ? 'ml-4' : ''}`}
                  style={{ transform: `translateY(${i * -4}px)` }}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} border ${card.border} flex items-center justify-center flex-shrink-0`}>
                    <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      {card.icon}
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white font-semibold text-sm">{card.title}</span>
                      <span className="text-xs text-slate-500 font-mono">{card.sub}</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{card.desc}</p>
                  </div>
                  <span className="text-2xl font-black text-white/5 font-mono">{card.step}</span>
                </div>
              ))}

              {/* Connector arrows */}
              <div className="absolute left-5 top-[5.5rem] h-[4.5rem] w-px bg-gradient-to-b from-cyan-400/40 to-indigo-400/40" />
              <div className="absolute left-5 top-[10.5rem] h-[4.5rem] w-px bg-gradient-to-b from-indigo-400/40 to-emerald-400/40" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features / Benefits ───────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: '🔒', title: '100% Private', desc: 'All processing happens on your device' },
              { icon: '☁️', title: 'No Cloud', desc: 'Your data never leaves your machine' },
              { icon: '⚡', title: 'CPU Powered', desc: 'Optimized for local performance' },
              { icon: '🚀', title: 'Fast & Efficient', desc: 'Powered by whisper.cpp and llama.cpp' },
              { icon: '🚫', title: 'No Tracking', desc: 'No analytics. No tracking. No compromise.' },
            ].map((f) => (
              <div key={f.title} className="glass-card px-5 py-5 text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <p className="text-white font-semibold text-sm mb-1">{f.title}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">How It Works</h2>
            <p className="text-slate-400 text-base">Three simple steps from audio to actionable insights</p>
          </div>

          {/* Horizontal timeline */}
          <div className="relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-cyan-500/40 via-indigo-500/40 to-emerald-500/40" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { n: '1', title: 'Upload', desc: 'Select your meeting recording (MP3 or WAV)', color: 'from-cyan-500 to-blue-600', glow: 'shadow-cyan-500/30' },
                { n: '2', title: 'Transcribe', desc: 'Whisper AI converts speech to accurate text', color: 'from-indigo-500 to-purple-600', glow: 'shadow-indigo-500/30' },
                { n: '3', title: 'Analyze', desc: 'Llama AI extracts insights, actions, and decisions', color: 'from-violet-500 to-pink-600', glow: 'shadow-violet-500/30' },
                { n: '4', title: 'Get Results', desc: 'View, copy, or download your structured results', color: 'from-emerald-500 to-teal-600', glow: 'shadow-emerald-500/30' },
              ].map((step) => (
                <div key={step.n} className="flex flex-col items-center text-center gap-4">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl ${step.glow} ring-1 ring-white/15 z-10`}>
                    <span className="text-white text-2xl font-black">{step.n}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">{step.title}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Row ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { value: '100%', label: 'Offline First', color: 'text-cyan-400' },
              { value: '0', label: 'Data Leaves Device', color: 'text-emerald-400' },
              { value: '100%', label: 'CPU Powered', color: 'text-indigo-400' },
              { value: '~2–5×', label: 'Faster with Local AI', color: 'text-violet-400' },
              { value: '∞', label: 'Privacy Guaranteed', color: 'text-rose-400' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card px-4 py-5 text-center">
                <p className={`text-3xl font-black mb-1 ${stat.color}`}>{stat.value}</p>
                <p className="text-slate-400 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}