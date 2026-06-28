import { Component } from 'react';

/**
 * ErrorBoundary — catches unhandled render errors anywhere in the tree.
 *
 * Shows a friendly recovery screen instead of a blank page.
 * Logs the error + component stack to console for debugging.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <App />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[MeetingMind] Unhandled render error:', error);
    console.error('[MeetingMind] Component stack:', info.componentStack);
  }

  handleReset() {
    this.setState({ hasError: false, error: null });
    // Navigate to root so the app re-initialises cleanly
    window.location.href = '/';
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const message = this.state.error?.message ?? 'An unexpected error occurred.';

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#0f172a]">
        <div className="w-full max-w-md text-center">

          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20
            flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>

          {/* Headline */}
          <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
          <p className="text-slate-400 text-sm mb-2">
            MeetingMind hit an unexpected error.
          </p>

          {/* Error detail */}
          <div className="glass-card px-4 py-3 mb-8 text-left">
            <p className="text-xs font-mono text-red-400 break-all leading-relaxed">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                bg-gradient-to-r from-cyan-500 to-blue-600
                text-white font-semibold text-sm
                shadow-lg shadow-cyan-500/25
                hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105 active:scale-100
                transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0
                     l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0
                     0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Reload App
            </button>

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                bg-slate-800/60 border border-slate-700/50
                text-slate-300 font-medium text-sm
                hover:bg-slate-700/60 hover:text-white
                transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0
                     0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Hard Refresh
            </button>
          </div>

          {/* Privacy note */}
          <p className="text-slate-600 text-xs mt-8">
            MeetingMind is offline-first — no error data is sent anywhere.
          </p>
        </div>
      </div>
    );
  }
}
