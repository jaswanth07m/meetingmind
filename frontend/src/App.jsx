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
 * Pages:  landing → upload → processing → results
 * All business logic lives in useMeeting(); App only manages navigation.
 */
export default function App() {
  const [page, setPage]           = useState('landing');
  const [currentFile, setCurrentFile] = useState(null);

  const { step, progress, result, error, process, reset } = useMeeting();

  useEffect(() => {
    if (step === 'uploading' || step === 'transcribing' || step === 'analyzing') {
      setPage('processing');
    }
    if (step === 'done' && result) {
      setPage('results');
    }
    if (step === 'error') {
      setPage('processing');
    }
  }, [step, result]);

  const handleUploadClick = () => setPage('upload');
  const handleBack        = () => setPage('landing');
  const handleProcess     = (file) => { setCurrentFile(file); process(file); };
  const handleReset       = () => { reset(); setCurrentFile(null); setPage('landing'); };
  const handleRetry       = () => { if (currentFile) process(currentFile); else { reset(); setPage('upload'); } };

  // Landing page has its own full navbar baked in
  const showSharedNav = page !== 'landing';

  return (
    <div className="min-h-screen flex flex-col">
      {showSharedNav && <Navbar />}

      <main className="flex-1">
        {page === 'landing' && (
          <LandingPage onUploadClick={handleUploadClick} />
        )}

        {page === 'upload' && (
          <UploadPage onProcess={handleProcess} onBack={handleBack} />
        )}

        {page === 'processing' && (
          <div>
            <ProcessingAnimation
              step={step}
              progress={progress}
              filename={currentFile?.name}
              error={error}
            />
            {step === 'error' && (
              <div className="flex justify-center gap-3 pb-12 -mt-4">
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-white text-sm font-semibold"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  Retry
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-secondary text-sm font-medium"
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