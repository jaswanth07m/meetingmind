import { useState } from 'react';
import UploadBox from '../components/UploadBox';

export default function UploadPage({ onProcess, onBack }) {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16">
      <div className="w-full max-w-2xl mx-auto">

        {/* ── Back ── */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-200 text-sm mb-10
            transition-colors duration-200 animate-fade-in"
        >
          <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>

        {/* ── Header ── */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs font-semibold text-cyan-300 mb-5 border border-cyan-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            100% Private · No Cloud · Runs on Your CPU
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">
            Upload <span className="text-gradient">Recording</span>
          </h1>
          <p className="text-slate-400 text-base">
            Select an audio file — it stays on your machine the entire time.
          </p>
        </div>

        {/* ── Drop zone ── */}
        <div className="animate-fade-in-up delay-100 mb-6">
          <UploadBox onFileSelect={setSelectedFile} />
        </div>

        {/* ── Selected file info card ── */}
        {selectedFile && (
          <div className="glass-card px-5 py-4 mb-6 flex items-center gap-4 animate-scale-in border-cyan-500/20">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{selectedFile.name}</p>
              <p className="text-slate-500 text-xs mt-0.5">
                {selectedFile.size < 1024 * 1024
                  ? (selectedFile.size / 1024).toFixed(1) + ' KB'
                  : (selectedFile.size / (1024 * 1024)).toFixed(1) + ' MB'}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Ready to process
            </span>
          </div>
        )}

        {/* ── Process button ── */}
        <div className="animate-fade-in-up delay-200 flex flex-col items-center gap-3">
          <button
            onClick={() => selectedFile && onProcess?.(selectedFile)}
            disabled={!selectedFile}
            className={`w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base
              transition-all duration-300 ${
                selectedFile
                  ? 'btn-primary text-white'
                  : 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-700/30'
              }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Process Meeting
          </button>

          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Your data never leaves your device
          </p>
        </div>

        {/* ── Bottom trust badges ── */}
        <div className="grid grid-cols-3 gap-3 mt-10 animate-fade-in-up delay-300">
          {[
            { icon: '🛡️', title: 'Private & Secure', desc: '100% offline processing\nYour data stays with you' },
            { icon: '🤖', title: 'AI Powered', desc: 'whisper.cpp + llama.cpp\nLocal AI processing' },
            { icon: '⚡', title: 'Fast & Efficient', desc: 'Optimized for CPU\nNo cloud dependencies' },
          ].map((b) => (
            <div key={b.title} className="glass-card px-3 py-4 text-center">
              <span className="text-2xl mb-2 block">{b.icon}</span>
              <p className="text-white text-xs font-semibold mb-1">{b.title}</p>
              <p className="text-slate-500 text-[0.65rem] leading-relaxed whitespace-pre-line">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}