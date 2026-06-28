import { useState, useRef, useCallback } from 'react';

const ACCEPTED_TYPES = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav', 'audio/x-m4a', 'audio/ogg'];
const ACCEPTED_EXTENSIONS = ['.mp3', '.wav', '.m4a', '.ogg'];

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
    ? 'border-red-500/60 bg-red-500/5'
    : dragOver
    ? 'border-cyan-400 bg-cyan-500/5 scale-[1.01]'
    : file
    ? 'border-cyan-500/50 bg-cyan-500/5'
    : 'border-slate-600/40 hover:border-slate-500/60 hover:bg-slate-800/20';

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`upload-zone relative rounded-2xl p-10 sm:p-14 cursor-pointer text-center
        transition-all duration-300 ${zoneClass}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".mp3,.wav,.m4a,.ogg,audio/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* ── Invalid file flash ── */}
      {invalid && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-900/80 backdrop-blur-sm z-10 animate-fade-in">
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-red-400 text-sm font-medium">Unsupported file type</p>
            <p className="text-slate-500 text-xs">Please use MP3 or WAV</p>
          </div>
        </div>
      )}

      {/* ── Empty state ── */}
      {!file ? (
        <div className="flex flex-col items-center gap-5">
          {/* icon ring */}
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-300
            ${dragOver
              ? 'bg-cyan-500/10 border-cyan-400/50 scale-110'
              : 'bg-slate-800/60 border-slate-700/50'}`}>
            <svg
              className={`w-9 h-9 transition-all duration-300 ${dragOver ? 'text-cyan-400 -translate-y-1' : 'text-slate-500'}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-3 3m3-3l3 3M5 20h14" />
            </svg>
          </div>

          <div>
            <p className="text-slate-200 font-semibold text-base">
              {dragOver ? 'Release to upload' : 'Drop your audio file here'}
            </p>
            <p className="text-slate-500 text-sm mt-1">or <span className="text-cyan-400 hover:text-cyan-300 transition-colors">browse files</span></p>
          </div>

          {/* format badges */}
          <div className="flex gap-2">
            {['MP3', 'WAV'].map((f) => (
              <span key={f}
                className="px-3 py-1 rounded-full bg-slate-800/60 text-xs text-slate-400
                  border border-slate-700/50 font-mono tracking-wide">
                {f}
              </span>
            ))}
          </div>

          <p className="text-slate-600 text-xs">Max file size: no limit · processed locally</p>
        </div>
      ) : (
        /* ── File selected state ── */
        <div className="flex flex-col items-center gap-4 animate-scale-in">
          {/* waveform icon */}
          <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center">
            <svg className="w-9 h-9 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>

          <div>
            <p className="text-cyan-300 font-semibold text-base truncate max-w-[260px]">{file.name}</p>
            <p className="text-slate-500 text-sm mt-0.5">{formatSize(file.size)}</p>
          </div>

          {/* ready badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
            bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Ready to process
          </span>

          <button
            onClick={handleRemove}
            className="text-xs text-slate-600 hover:text-red-400 transition-colors duration-200 flex items-center gap-1"
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