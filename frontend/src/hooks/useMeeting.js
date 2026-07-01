import { useState, useCallback } from 'react';
import * as api from '../services/api';

/**
 * useMeeting — orchestrates the upload → transcribe → analyze pipeline.
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
      // STEP 1 — Upload
      setStep('uploading');

      const uploadResult = await api.upload(file, (pct) => {
        setProgress(pct);
      });

      const uploadedFilename = uploadResult.filename;

      // STEP 2 — Transcribe
      setStep('transcribing');

      const transcribeResult = await api.transcribe(uploadedFilename);

      const transcript = transcribeResult.transcript;

      // STEP 3 — Analyze
      setStep('analyzing');

      const analysis = await api.analyze(transcript);

      const finalResult = {
        filename: file.name,
        transcript,

        summary: analysis.summary ?? "",

        attendees: analysis.attendees ?? [],

        decisions: analysis.decisions ?? [],

        // Backend returns action_items
        actionItems:
          analysis.actionItems ??
          analysis.action_items ??
          [],

        processedAt: new Date().toISOString(),
      };

      setResult(finalResult);
      setStep("done");

    } catch (err) {
      console.error("[MeetingMind]", err);

      setError(
        err.message ||
        "Failed to process meeting."
      );

      setStep("error");
    }

  }, []);

  return {
    step,
    progress,
    result,
    error,
    process,
    reset,
  };
}

export default useMeeting;