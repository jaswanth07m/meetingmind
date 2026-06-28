import { useCallback } from 'react';
import TranscriptCard  from '../components/TranscriptCard';
import SummaryCard     from '../components/SummaryCard';
import ActionItemCard  from '../components/ActionItemCard';
import AttendeeCard    from '../components/AttendeeCard';
import DecisionCard    from '../components/DecisionCard';
import JsonViewer      from '../components/JsonViewer';
import StatusBadge     from '../components/StatusBadge';

export default function ResultsPage({ data, onReset }) {
  /* ── Download JSON ── */
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

  const processedAt = data?.processedAt
    ? new Date(data.processedAt).toLocaleString()
    : null;

  return (
    <div className="min-h-screen px-4 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">

        {/* ── Page header ── */}
        <div className="text-center mb-10 animate-fade-in">
          {/* success icon */}
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20
            flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Meeting Results
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
            <StatusBadge variant="success" label="Analysis complete" dot />
            {data?.filename && (
              <StatusBadge variant="info" label={data.filename} />
            )}
          </div>

          {processedAt && (
            <p className="text-slate-500 text-xs mt-1">Processed {processedAt}</p>
          )}
        </div>

        {/* ── Action bar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-fade-in-up delay-100">
          {/* Download JSON */}
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl
              bg-slate-800/60 border border-slate-700/50 text-slate-300 text-sm font-medium
              hover:bg-slate-700/60 hover:border-slate-600/50 hover:text-white
              transition-all duration-200"
          >
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download JSON
          </button>

          {/* Process another */}
          <button
            onClick={onReset}
            className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl
              bg-gradient-to-r from-cyan-500 to-blue-600
              text-white text-sm font-semibold
              shadow-md shadow-cyan-500/20
              hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-100
              transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 16v-8m0 0l-3 3m3-3l3 3M5 20h14" />
            </svg>
            Process Another Meeting
          </button>
        </div>

        {/* ── Results grid ── */}
        <div className="space-y-5">
          {/* Summary — most important, first */}
          <div className="animate-fade-in-up delay-200">
            <SummaryCard summary={data?.summary} />
          </div>

          {/* Attendees + Decisions — side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up delay-300">
            <AttendeeCard attendees={data?.attendees} />
            <DecisionCard decisions={data?.decisions} />
          </div>

          {/* Action items */}
          <div className="animate-fade-in-up delay-400">
            <ActionItemCard items={data?.actionItems} />
          </div>

          {/* Transcript — collapsible feel via max-height */}
          <div className="animate-fade-in-up delay-500">
            <TranscriptCard transcript={data?.transcript} />
          </div>

          {/* JSON viewer + download */}
          <div className="animate-fade-in-up delay-600">
            <JsonViewer data={data} label="Raw JSON Output" />
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-10 text-center animate-fade-in-up delay-600">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200"
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