import React, { Component } from 'react';
import { AlertTriangle, RotateCcw, Home, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';

/**
 * Reusable React Error Boundary for Beyond Earth.
 * Catches rendering errors, prevents blank screens, and provides
 * graceful recovery aligned with the Starry Violet Space Theme.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log diagnostics safely in the console without leaking secrets
    console.error('[Beyond Earth Error Boundary]:', error?.message || error, errorInfo?.componentStack || '');
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps) {
    // If a resetKey prop is provided and changes, reset error state
    if (this.props.resetKey !== undefined && prevProps.resetKey !== this.props.resetKey) {
      if (this.state.hasError) {
        this.setState({ hasError: false, error: null, showDetails: false });
      }
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, showDetails: false });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, render it
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function'
          ? this.props.fallback({ error: this.state.error, reset: this.handleRetry })
          : this.props.fallback;
      }

      return (
        <div 
          role="alert" 
          aria-live="assertive"
          className="min-h-[400px] flex items-center justify-center p-6 text-center"
        >
          <div className="glass-panel p-8 sm:p-10 rounded-3xl max-w-xl w-full border border-purple-500/30 shadow-violet-glow relative overflow-hidden">
            {/* Ambient Radial Accent */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Icon Header */}
            <div className="w-14 h-14 rounded-2xl bg-purple-900/40 border border-purple-400/40 flex items-center justify-center mx-auto mb-4 text-purple-300 shadow-sm">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-purple-300 block mb-1 font-bold">
              Flight Telemetry Interrupted
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-white mb-2">
              Mission Control Anomaly
            </h2>

            <p className="text-sm text-[#A99BBF] max-w-md mx-auto leading-relaxed mb-6">
              A temporary rendering anomaly occurred while processing deep space telemetry. You can recalibrate the module or return to mission headquarters.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <button
                onClick={this.handleRetry}
                className="btn-violet px-5 py-2.5 rounded-xl font-mono font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-violet-glow"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Recalibrate & Retry</span>
              </button>

              <a
                href="/"
                className="px-5 py-2.5 rounded-xl bg-space-navy/90 hover:bg-[#1A1230] border border-purple-500/30 text-slate-200 hover:text-white font-mono text-xs transition-colors flex items-center gap-2"
              >
                <Home className="w-4 h-4 text-purple-300" />
                <span>Mission Control</span>
              </a>
            </div>

            {/* Diagnostic Details Toggle */}
            {this.state.error && (
              <div className="pt-4 border-t border-purple-500/20 text-left">
                <button
                  onClick={() => this.setState(prev => ({ showDetails: !prev.showDetails }))}
                  aria-expanded={this.state.showDetails}
                  className="flex items-center justify-between w-full text-xs font-mono text-slate-400 hover:text-purple-300 transition-colors"
                >
                  <span>Diagnostic Telemetry Log</span>
                  {this.state.showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {this.state.showDetails && (
                  <pre className="mt-2.5 p-3 rounded-xl bg-[#080512]/90 border border-purple-500/25 text-[11px] font-mono text-purple-200 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {this.state.error.message || String(this.state.error)}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
