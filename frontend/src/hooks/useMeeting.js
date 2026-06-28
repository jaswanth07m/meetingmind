import { useState, useCallback } from 'react';
import * as api from '../services/api';

/**
 * useMeeting — orchestrates the full upload → transcribe → analyze pipeline.
 *
 * Returns:
 *   step        — 'idle' | 'uploading' | 'transcribing' | 'analyzing' | 'done' | 'error'
 *   progress    — 0-100 upload progress
 *   result      — final meeting data object (or null)
 *   error       — error message (or null)
 *   process(file) — start the pipeline
 *   reset()     — go back to idle
 */
export function useMeeting() {
  const [step, setStep] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const reset = useCallback(() => {
    setStep('idle');
    setProgress(0);
    setResult(null);
    setError(null);
  }, []);

  const process = useCallback(async (file) => {
    setError(null);
    setResult(null);
    setProgress(0);

    try {
      // ── Step 1: Upload ──────────────────────────────────────────────────
      setStep('uploading');
      let uploadedFilename;

      try {
        const uploadResult = await api.upload(file, (pct) => setProgress(pct));
        uploadedFilename = uploadResult?.filename ?? file.name;
      } catch (uploadErr) {
        // Backend upload not yet implemented — use placeholder so the rest of
        // the flow can be demonstrated end-to-end without crashing.
        console.warn('[MeetingMind] /upload not ready — using placeholder:', uploadErr.message);
        uploadedFilename = file.name;
        // Simulate progress
        for (let p = 0; p <= 100; p += 20) {
          setProgress(p);
          await sleep(120);
        }
      }

      // ── Step 2: Transcribe ──────────────────────────────────────────────
      setStep('transcribing');
      let transcript;

      try {
        const transcribeResult = await api.transcribe(uploadedFilename);
        transcript = transcribeResult?.transcript ?? '';
      } catch (transcribeErr) {
        console.warn('[MeetingMind] /transcribe not ready — using placeholder:', transcribeErr.message);
        await sleep(1800);
        transcript = placeholderTranscript(file.name);
      }

      // ── Step 3: Analyze ─────────────────────────────────────────────────
      setStep('analyzing');
      let analysis;

      try {
        analysis = await api.analyze(transcript);
      } catch (analyzeErr) {
        console.warn('[MeetingMind] /analyze not ready — using placeholder:', analyzeErr.message);
        await sleep(2000);
        analysis = placeholderAnalysis(transcript);
      }

      // ── Done ─────────────────────────────────────────────────────────────
      const finalResult = {
        filename: file.name,
        transcript,
        summary:     analysis?.summary     ?? '',
        attendees:   analysis?.attendees   ?? [],
        decisions:   analysis?.decisions   ?? [],
        actionItems: analysis?.actionItems ?? [],
        processedAt: new Date().toISOString(),
      };

      setResult(finalResult);
      setStep('done');

    } catch (err) {
      console.error('[MeetingMind] Pipeline failed:', err);
      setError(err.message ?? 'An unexpected error occurred.');
      setStep('error');
    }
  }, []);

  return { step, progress, result, error, process, reset };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Placeholder transcript used when the backend transcribe endpoint isn't ready.
 * Makes the demo feel real without inventing false data.
 */
function placeholderTranscript(filename) {
  return `[Placeholder transcript — whisper.cpp not yet connected]

This transcript was generated as a placeholder because the /transcribe endpoint
is not yet implemented on the backend.

File processed: ${filename}
Timestamp: ${new Date().toLocaleString()}

Once whisper.cpp is integrated, this section will contain the full speech-to-text
output from your meeting recording, including speaker turns and timestamps.`;
}

/**
 * Placeholder analysis used when the backend analyze endpoint isn't ready.
 */
function placeholderAnalysis(transcript) {
  const isPlaceholder = transcript.includes('[Placeholder transcript');

  if (isPlaceholder) {
    return {
      summary:
        'This is a placeholder summary. Once the backend /analyze endpoint is ' +
        'connected to llama.cpp, this will contain an AI-generated summary of ' +
        'your meeting covering the main topics discussed.',
      attendees:   ['Backend Team', 'Frontend Team'],
      decisions:   ['Integrate whisper.cpp for transcription', 'Integrate llama.cpp for analysis'],
      actionItems: [
        'Connect /upload endpoint to save files on disk',
        'Connect /transcribe endpoint to whisper.cpp',
        'Connect /analyze endpoint to llama.cpp',
        'Run end-to-end test with a real recording',
      ],
    };
  }

  return {
    summary:     'AI summary will appear here once /analyze is connected.',
    attendees:   [],
    decisions:   [],
    actionItems: [],
  };
}

export default useMeeting;