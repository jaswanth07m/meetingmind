import { useState, useRef, useCallback } from 'react';

const ACCEPTED_TYPES = [
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/x-wav',
  'audio/x-m4a',
  'audio/mp4',
  'video/mp4',
  'audio/ogg',
  'audio/webm',
  'video/webm',
  'audio/flac',
  'audio/opus',
  'application/octet-stream'
];

const ACCEPTED_EXTENSIONS = [
  '.mp3',
  '.wav',
  '.m4a',
  '.mp4',
  '.ogg',
  '.webm',
  '.flac',
  '.opus'
];

function formatSize(bytes) {
  if (bytes < 1024)        return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function UploadBox({ onFileSelect }) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile]         = useState(null);
  const [invalid, setInvalid]   = useState(false);
  const inputRef = useRef(null);

  const isValidFile = (f) => {
    const ext = '.' + f.name.split('.').pop().toLowerCase();
    return ACCEPTED_TYPES.includes(f.type) || ACCEPTED_EXTENSIONS.includes(ext);
  };

  const handleFile = useCallback((f) => {
    if (!f) return;
    if (isValidFile(f)) {
      setFile(f);
      setInvalid(false);
      onFileSelect?.(f);
    } else {
      setInvalid(true);
      setTimeout(() => setInvalid(false), 2500);
    }
  }, [onFileSelect]);

  const handleDrop        = useCallback((e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }, [handleFile]);
  const handleDragOver    = useCallback((e) => { e.preventDefault(); setDragOver(true);  }, []);
  const handleDragLeave   = useCallback((e) => { e.preventDefault(); setDragOver(false); }, []);
  const handleInputChange = (e) => handleFile(e.target.files[0]);
  const handleClick       = () => inputRef.current?.click();
  const handleRemove      = (e) => {
    e.stopPropagation();
    setFile(null);
    onFileSelect?.(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  /* ── border / bg state ── */
  const zoneClass = invalid
    ? 'border-red-500/60 bg-red-500/[0.04]'
    : dragOver
    ? 'border-cyan-400 bg-cyan-500/[0.06] scale-[1.01] shadow-[0_25px_60px_-25px_rgba(6,182,212,0.6)]'
    : file
    ? 'border-cyan-500/50 bg-cyan-500/[0.04]'
    : 'border-slate-600/40 hover:border-cyan-400/40 hover:bg-slate-800/20';

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`upload-zone glass-card group relative overflow-hidden rounded-3xl p-10 sm:p-16 cursor-pointer text-center
        transition-all duration-300 ${zoneClass}`}
    >
      {/* soft ambient sheen that follows drag state */}
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500
          ${dragOver ? 'opacity-100' : 'group-hover:opacity-60'}`}
        style={{ background: 'radial-gradient(30rem 20rem at 50% 0%, rgba(34,211,238,0.10), transparent 70%)' }}
      />

      <input
        ref={inputRef}
        type="file"
        accept=".mp3,.wav,.m4a,.mp4,.ogg,.webm,.flac,.opus,audio/*,video/mp4"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* ── Invalid file flash ── */}
      {invalid && (
        <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-slate-950/85 backdrop-blur-md z-10 animate-fade-in">
          <div className="flex flex-col items-center gap-2.5">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-red-400 text-sm font-semibold">Unsupported file type</p>
            <p className="text-slate-500 text-xs">Please use MP3, WAV, M4A, MP4, OGG, WEBM or FLAC</p>
          </div>
        </div>
      )}

      {/* ── Empty state ── */}
      {!file ? (
        <div className="relative flex flex-col items-center gap-6">
          {/* icon ring with animated pulse halo */}
          <div className="relative">
            <span
              className={`absolute inset-0 rounded-3xl transition-all duration-500
                ${dragOver ? 'bg-cyan-400/20 scale-125 blur-xl' : 'bg-cyan-500/5 scale-100 blur-lg opacity-0 group-hover:opacity-100'}`}
            />
            <div className={`relative w-24 h-24 rounded-3xl flex items-center justify-center border transition-all duration-300
              ${dragOver
                ? 'bg-cyan-500/10 border-cyan-400/50 scale-110'
                : 'bg-slate-800/60 border-slate-700/50 group-hover:border-cyan-400/30'}`}>
              <svg
                className={`w-11 h-11 transition-all duration-300 ${dragOver ? 'text-cyan-400 -translate-y-1.5' : 'text-slate-500 group-hover:text-cyan-400/80'}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-3 3m3-3l3 3M5 20h14" />
              </svg>
            </div>
          </div>

          <div>
            <p className="text-slate-100 font-semibold text-lg tracking-tight">
              {dragOver ? 'Release to upload' : 'Drop your audio file here'}
            </p>
            <p className="text-slate-500 text-sm mt-1.5">or <span className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">browse files</span></p>
          </div>

          {/* format badges */}
          <div className="flex gap-2">
            {['MP3', 'WAV', 'M4A', 'MP4', 'OGG', 'WEBM', 'FLAC', 'OPUS'].map((f) => (
              <span key={f}
                className="px-3.5 py-1.5 rounded-full bg-slate-800/60 text-xs text-slate-400
                  border border-slate-700/50 font-mono tracking-widest">
                {f}
              </span>
            ))}
          </div>

          <p className="text-slate-500 text-xs">Max file size: 500 MB · processed locally</p>
        </div>
      ) : (
        /* ── File selected state ── */
        <div className="relative flex flex-col items-center gap-5 animate-scale-in">
          {/* waveform icon */}
          <div className="relative">
            <span className="absolute inset-0 rounded-3xl bg-cyan-400/15 blur-xl scale-110" />
            <div className="relative w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <svg className="w-11 h-11 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
          </div>

          <div>
            <p className="text-cyan-300 font-semibold text-base truncate max-w-[280px]">{file.name}</p>
            <p className="text-slate-500 text-sm mt-1">{formatSize(file.size)}</p>
          </div>

          {/* ready badge */}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
            bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Ready to process
          </span>

          <button
            onClick={handleRemove}
            className="text-xs text-slate-500 hover:text-red-400 transition-colors duration-200 flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Remove file
          </button>
        </div>
      )}
    </div>
  );
}
