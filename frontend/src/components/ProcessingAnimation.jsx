import { useEffect, useState } from 'react';

/**
 * ProcessingAnimation
 *
 * Props:
 *   step      — 'uploading' | 'transcribing' | 'analyzing' | 'done' | 'error'
 *   progress  — 0-100 upload progress (only shown during 'uploading')
 *   filename  — original filename for display
 *   error     — error message string (only shown on 'error' step)
 */

const STEPS = [
  {
    key: 'uploading',
    label: 'Uploading',
    description: 'Sending your audio file to the local server',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-3 3m3-3l3 3M5 20h14" />
      </svg>
    ),
  },
  {
    key: 'transcribing',
    label: 'Transcribing',
    description: 'Whisper AI is converting speech to text',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    key: 'analyzing',
    label: 'Analyzing',
    description: 'Llama AI is extracting insights and action items',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
];

const STEP_ORDER = ['uploading', 'transcribing', 'analyzing', 'done'];

function stepIndex(step) {
  return STEP_ORDER.indexOf(step);
}

export default function ProcessingAnimation({ step = 'uploading', progress = 0, filename, error }) {
  const [dots, setDots] = useState('');

  // Animated ellipsis for the active step label
  useEffect(() => {
    if (step === 'done' || step === 'error') return;
    const id = setInterval(() => setDots((d) => (d.length >= 3 ? '' : d + '.')), 500);
    return () => clearInterval(id);
  }, [step]);

  const currentIdx = stepIndex(step);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16">
      <div className="w-full max-w-md mx-auto">

        {/* Central icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {step !== 'error' ? (
              <>
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                {/* Pulsing ring */}
                {step !== 'done' && (
                  <div className="absolute -inset-3 rounded-3xl border border-cyan-500/30 animate-ping" style={{ animationDuration: '2s' }} />
                )}
              </>
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <svg className="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Filename chip */}
        {filename && (
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25" />
              </svg>
              <span className="text-xs text-slate-400 font-mono max-w-[200px] truncate">{filename}</span>
            </div>
          </div>
        )}

        {/* Main label */}
        <div className="text-center mb-8">
          {step === 'error' ? (
            <>
              <h2 className="text-xl font-bold text-red-400 mb-2">Processing Failed</h2>
              <p className="text-slate-400 text-sm">{error || 'An unexpected error occurred.'}</p>
            </>
          ) : step === 'done' ? (
            <>
              <h2 className="text-xl font-bold text-emerald-400 mb-2">Analysis Complete!</h2>
              <p className="text-slate-400 text-sm">Your meeting insights are ready.</p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-white mb-2">
                Processing{dots}
              </h2>
              <p className="text-slate-400 text-sm">
                Running entirely on your machine — no data sent to the cloud.
              </p>
            </>
          )}
        </div>

        {/* Step tracker */}
        {step !== 'error' && (
          <div className="space-y-3 mb-8">
            {STEPS.map((s, idx) => {
              const isDone   = currentIdx > idx || step === 'done';
              const isActive = currentIdx === idx && step !== 'done';

              return (
                <div
                  key={s.key}
                  className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-500 ${
                    isActive
                      ? 'bg-cyan-500/5 border-cyan-500/20'
                      : isDone
                      ? 'bg-emerald-500/5 border-emerald-500/10'
                      : 'bg-slate-800/30 border-slate-700/30 opacity-40'
                  }`}
                >
                  {/* Step icon / state */}
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-400'
                        : isDone
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-slate-700/50 text-slate-600'
                    }`}
                  >
                    {isDone ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : isActive ? (
                      <span className="relative flex">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-40" />
                        {s.icon}
                      </span>
                    ) : (
                      s.icon
                    )}
                  </div>

                  {/* Labels */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isActive ? 'text-cyan-300' : isDone ? 'text-emerald-300' : 'text-slate-600'}`}>
                      {s.label}
                    </p>
                    {(isActive || isDone) && (
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{s.description}</p>
                    )}
                  </div>

                  {/* Active spinner */}
                  {isActive && (
                    <div className="w-5 h-5 border-2 border-slate-700 border-t-cyan-400 rounded-full animate-spin flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Upload progress bar */}
        {step === 'uploading' && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Uploading</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Privacy note */}
        {step !== 'error' && step !== 'done' && (
          <div className="flex items-center justify-center gap-2 mt-6 text-slate-600">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-xs">100% offline — your audio never leaves this device</span>
          </div>
        )}
      </div>
    </div>
  );
}