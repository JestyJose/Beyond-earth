import React from 'react';
import { ExternalLink, Database, ShieldCheck, BookOpen } from 'lucide-react';

export default function SourcesList({ sources = [], nssdcaId }) {
  return (
    <div id="sources" className="glass-panel p-6 sm:p-8 rounded-3xl mb-10 border border-space-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-space-border gap-2 mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-space-cyan block">
            Scientific Rigor & Provenance
          </span>
          <h3 className="font-heading font-bold text-xl text-white">
            Official NASA Primary Sources & Archives
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Curated NASA Open Data Archives</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* NSSDCA Master Catalog Link if available */}
        {nssdcaId && (
          <div className="p-4 rounded-2xl bg-space-navy/70 border border-space-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <Database className="w-4 h-4 text-space-cyan shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono font-bold text-white block">
                  NASA Space Science Data Coordinated Archive (NSSDCA)
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Official Master Catalog ID: <span className="text-space-cyan">{nssdcaId}</span>
                </span>
              </div>
            </div>
            <a
              href={`https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=${encodeURIComponent(nssdcaId)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-space-card hover:bg-space-navy border border-white/10 text-xs font-mono text-space-cyan hover:text-white transition-colors self-start sm:self-auto"
            >
              <span>Query NSSDCA</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* List of Primary Sources */}
        {sources && sources.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map((src, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-space-navy/60 border border-space-border hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-space-cyan shrink-0" />
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-space-cyan/15 text-space-cyan border border-space-cyan/30">
                      {src.source_type || 'NASA Archive'}
                    </span>
                  </div>
                  <h4 className="font-heading font-semibold text-sm text-white mb-1">
                    {src.title}
                  </h4>
                  {src.quotation_or_reference && (
                    <p className="text-xs font-mono text-slate-400 leading-relaxed">
                      {src.quotation_or_reference}
                    </p>
                  )}
                </div>

                {src.url && (
                  <div className="mt-3 pt-2 border-t border-white/5">
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-space-cyan hover:underline"
                    >
                      <span>Visit Official NASA Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
