import { useState } from 'react';
import UploadBox from '../components/UploadBox';

export default function UploadPage({ onProcess, onBack }) {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16">
      <div className="w-full max-w-xl mx-auto">

        {/* ── Back link ── */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm mb-8
            transition-colors duration-200 animate-fade-in"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>

        {/* ── Header ── */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Upload Recording
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Select an audio file — it stays on your machine the entire time
          </p>
        </div>

        {/* ── Upload zone ── */}
        <div className="animate-fade-in-up delay-100">
          <UploadBox onFileSelect={setSelectedFile} />
        </div>

        {/* ── Process button ── */}
        <div className="mt-8 flex flex-col items-center gap-3 animate-fade-in-up delay-200">
          <button
            onClick={() => selectedFile && onProcess?.(selectedFile)}
            disabled={!selectedFile}
            className={`inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-base
              transition-all duration-300 ${
                selectedFile
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105 active:scale-100'
                  : 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-700/30'
              }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            {selectedFile ? 'Process Meeting' : 'Select a file first'}
          </button>

          <p className="text-slate-600 text-xs">Supported formats: MP3, WAV</p>
        </div>
      </div>
    </div>
  );
}