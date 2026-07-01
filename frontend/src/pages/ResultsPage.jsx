import { useCallback } from 'react';
import TranscriptCard  from '../components/TranscriptCard';
import SummaryCard     from '../components/SummaryCard';
import ActionItemCard  from '../components/ActionItemCard';
import AttendeeCard    from '../components/AttendeeCard';
import DecisionCard    from '../components/DecisionCard';
import JsonViewer      from '../components/JsonViewer';
import StatusBadge     from '../components/StatusBadge';

export default function ResultsPage({ data, onReset }) {
  const handleDownload = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    const name = (data?.filename ?? 'meeting').replace(/\.[^.]+$/, '');
    a.href     = url;
    a.download = `${name}-results.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const processedAt = data?.processedAt ? new Date(data.processedAt).toLocaleString() : null;
  const attendees   = data?.attendees ?? [];
  const actionItems = data?.actionItems ?? [];
  const decisions   = data?.decisions ?? [];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <div className="max-w-5xl mx-auto">

        {/* ── Top action bar (Download + Process Another) ── */}
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-white">
            Meeting <span className="text-gradient">Results</span>
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="btn-secondary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download JSON
            </button>
            <button
              onClick={onReset}
              className="btn-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-3 3m3-3l3 3M5 20h14" />
              </svg>
              Process Another
            </button>
          </div>
        </div>

        {/* ── Hero success card ── */}
        <div className="glass-card p-6 sm:p-8 mb-6 animate-fade-in-up overflow-hidden relative">
          {/* glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Check icon */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-500/25 flex items-center justify-center">
                <svg className="w-10 h-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="absolute -inset-3 bg-cyan-500/10 rounded-full blur-xl" />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-white mb-1">Analysis Complete!</h2>
              <p className="text-slate-400 text-sm mb-3">Your meeting has been transcribed and analyzed.</p>
              <div className="flex flex-wrap items-center gap-2">
                {data?.filename && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 border border-slate-700/50 px-3 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25" />
                    </svg>
                    {data.filename}
                  </span>
                )}
                {processedAt && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 border border-slate-700/50 px-3 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
                    </svg>
                    {processedAt}
                  </span>
                )}
                <StatusBadge variant="success" label="Analysis complete" dot />
              </div>
            </div>
          </div>

          {/* ── Stats row ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-700/40">
            {[
              { icon: '⏱️', value: '—', label: 'Duration', color: 'text-cyan-400' },
              { icon: '👥', value: attendees.length, label: 'Attendees', color: 'text-blue-400' },
              { icon: '✅', value: actionItems.length, label: 'Action Items', color: 'text-amber-400' },
              { icon: '🎯', value: decisions.length, label: 'Decisions', color: 'text-emerald-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-slate-800/40 border border-slate-700/40 rounded-2xl px-4 py-3 text-center hover:border-slate-600/60 transition-colors">
                <p className={`text-3xl font-black mb-0.5 ${stat.color}`}>{stat.value}</p>
                <p className="text-slate-500 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main 2-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Summary — left, wider */}
          <div className="lg:col-span-3 animate-fade-in-up delay-100">
            <SummaryCard summary={data?.summary} />
          </div>
          {/* Transcript — right */}
          <div className="lg:col-span-2 animate-fade-in-up delay-200">
            <TranscriptCard transcript={data?.transcript} />
          </div>
        </div>

        {/* ── Attendees | Action Items | Decisions ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {/* Attendees */}
          <div className="animate-fade-in-up delay-200">
            <AttendeeCard attendees={attendees} />
          </div>
          {/* Action Items */}
          <div className="animate-fade-in-up delay-300">
            <ActionItemCard items={actionItems} />
          </div>
          {/* Decisions */}
          <div className="animate-fade-in-up delay-400">
            <DecisionCard decisions={decisions} />
          </div>
        </div>

        {/* ── JSON Viewer ── */}
        <div className="animate-fade-in-up delay-500">
          <JsonViewer data={data} label="Raw JSON Output" />
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-10 text-center animate-fade-in-up delay-600">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-300 text-sm transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Analyze another recording
          </button>
        </div>
      </div>
    </div>
  );
}