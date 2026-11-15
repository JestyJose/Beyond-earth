import React from 'react';
import { ExternalLink, Database, ShieldCheck, BookOpen, Info } from 'lucide-react';

export default function SourcesList({ sources = [], nssdcaId }) {
  const hasSources = sources && sources.length > 0;

  return (
    <div id="sources" className="glass-panel scroll-mt-24 p-6 sm:p-8 rounded-3xl mb-10 border border-space-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-space-border gap-2 mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-purple-300 block font-bold">
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
        {nssdcaId ? (
          <div className="p-4 rounded-2xl bg-space-navy/70 border border-space-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <Database className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono font-bold text-white block">
                  NASA Space Science Data Coordinated Archive (NSSDCA)
                </span>
                <span className="text-xs font-mono text-[#A99BBF]">
                  Official Master Catalog ID: <span className="text-purple-300">{nssdcaId}</span>
                </span>
              </div>
            </div>
            <a
              href={`https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=${encodeURIComponent(nssdcaId)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Query NSSDCA catalog for spacecraft ID ${nssdcaId} (opens in a new tab)`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-space-card hover:bg-space-navy border border-purple-500/20 text-xs font-mono text-purple-200 hover:text-white transition-colors self-start sm:self-auto focus-ring"
            >
              <span>Query NSSDCA</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-space-navy/50 border border-white/5 flex items-center gap-2 text-xs text-[#A99BBF]">
            <Info className="w-4 h-4 text-purple-300 shrink-0" />
            <span>NSSDCA Master Catalog identifier not recorded for this hardware profile.</span>
          </div>
        )}

        {/* List of Primary Sources */}
        {hasSources ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map((src, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-space-navy/60 border border-space-border hover:border-purple-400/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-900/40 text-purple-200 border border-purple-500/30">
                      {src.source_type || 'NASA Archive'}
                    </span>
                  </div>
                  <h4 className="font-heading font-semibold text-sm text-white mb-1">
                    {src.title || 'Official NASA Mission Document'}
                  </h4>
                  {src.quotation_or_reference && (
                    <p className="text-xs font-mono text-[#A99BBF] leading-relaxed">
                      {src.quotation_or_reference}
                    </p>
                  )}
                </div>

                {src.url && (
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-end">
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open external citation: ${src.title || 'NASA Source'} (opens in a new tab)`}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-purple-300 hover:text-white transition-colors focus-ring rounded"
                    >
                      <span>View Primary Citation</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-space-navy/50 border border-white/5 text-xs text-[#A99BBF]">
            Primary scientific source citations undergoing automated bibliographic verification.
          </div>
        )}
      </div>
    </div>
  );
}
