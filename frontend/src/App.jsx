import { useState, useEffect } from 'react';
import Navbar              from './components/Navbar';
import Footer              from './components/Footer';
import LandingPage         from './pages/LandingPage';
import UploadPage          from './pages/UploadPage';
import ResultsPage         from './pages/ResultsPage';
import ProcessingAnimation from './components/ProcessingAnimation';
import { useMeeting }      from './hooks/useMeeting';

/**
 * App — top-level flow controller.
 *
 * Pages:  landing → upload → processing → results
 *
 * All business logic lives in useMeeting(); App only manages navigation.
 */
export default function App() {
  const [page, setPage]           = useState('landing');
  const [currentFile, setCurrentFile] = useState(null);

  const { step, progress, result, error, process, reset } = useMeeting();

  /* ── Automatically advance pages based on pipeline state ── */
  useEffect(() => {
    if (step === 'uploading' || step === 'transcribing' || step === 'analyzing') {
      setPage('processing');
    }
    if (step === 'done' && result) {
      setPage('results');
    }
    if (step === 'error') {
      setPage('processing'); // shows error state inside ProcessingAnimation
    }
  }, [step, result]);

  /* ── Handlers ── */
  const handleUploadClick = () => setPage('upload');

  const handleBack = () => setPage('landing');

  const handleProcess = (file) => {
    setCurrentFile(file);
    process(file);          // kicks off upload → transcribe → analyze
  };

  const handleReset = () => {
    reset();
    setCurrentFile(null);
    setPage('landing');
  };

  const handleRetry = () => {
    if (currentFile) {
      process(currentFile);
    } else {
      reset();
      setPage('upload');
    }
  };

  /* ── Render ── */
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {page === 'landing' && (
          <LandingPage onUploadClick={handleUploadClick} />
        )}

        {page === 'upload' && (
          <UploadPage
            onProcess={handleProcess}
            onBack={handleBack}
          />
        )}

        {page === 'processing' && (
          <div>
            <ProcessingAnimation
              step={step}
              progress={progress}
              filename={currentFile?.name}
              error={error}
            />

            {/* Error recovery actions */}
            {step === 'error' && (
              <div className="flex justify-center gap-3 pb-12 -mt-4">
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                    bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold
                    hover:scale-105 active:scale-100 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  Retry
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                    bg-slate-800/60 border border-slate-700/50 text-slate-300 text-sm font-medium
                    hover:bg-slate-700/60 transition-all duration-200"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        )}

        {page === 'results' && result && (
          <ResultsPage data={result} onReset={handleReset} />
        )}
      </main>

      <Footer />
    </div>
  );
}