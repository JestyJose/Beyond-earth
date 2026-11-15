import React, { useState } from 'react';
import { Cpu, ChevronDown, ChevronUp, Radio, Info } from 'lucide-react';

export default function InstrumentSuite({ instruments = [] }) {
  const [expandedSpecs, setExpandedSpecs] = useState({});

  const toggleSpec = (idx) => {
    setExpandedSpecs(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Robust handling when instruments array is empty or undefined
  if (!instruments || instruments.length === 0) {
    return (
      <div id="instruments" className="glass-panel scroll-mt-24 p-6 sm:p-8 rounded-3xl mb-10 border border-purple-500/20">
        <span className="text-[11px] font-mono uppercase tracking-widest text-purple-300 block mb-1 font-bold">
          Scientific Payload
        </span>
        <h3 className="font-heading font-bold text-xl text-white mb-2">
          The Machine’s Senses
        </h3>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#A99BBF]">
          <Info className="w-4 h-4 text-purple-300 shrink-0" />
          <span>Scientific instrument suite telemetry is currently pending archival ingestion for this mission.</span>
        </div>
      </div>
    );
  }

  return (
    <div id="instruments" className="glass-panel scroll-mt-24 p-6 sm:p-8 rounded-3xl mb-10 border border-space-border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-space-border gap-2 mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-purple-300 block font-bold">
            Scientific Payload
          </span>
          <h3 className="font-heading font-bold text-2xl text-white">
            The Machine’s Senses ({instruments.length} Scientific Instruments)
          </h3>
        </div>
        <p className="text-xs text-[#A99BBF] font-mono">
          Click an instrument to inspect technical flight telemetry
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {instruments.map((inst, i) => {
          const isExpanded = !!expandedSpecs[i];
          const specId = `instrument-spec-${i}`;

          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-space-navy/70 border border-space-border hover:border-purple-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading font-bold text-base text-white">
                    {inst.name || 'Scientific Sensor'}
                  </h4>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-900/40 text-purple-200 border border-purple-500/30">
                    {inst.acronym || 'INSTRUMENT'}
                  </span>
                </div>

                {/* Student-Friendly Metaphor Explanation */}
                <div className="mt-3 p-3.5 rounded-xl bg-space-card/80 border border-white/5">
                  <span className="text-[10.5px] font-mono uppercase tracking-wider text-purple-300 block mb-1 font-bold">
                    How it works for young scientists:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {inst.purpose_student_friendly || 'Sensor explanation pending translation into student explainers.'}
                  </p>
                </div>
              </div>

              {/* Technical Specifications Accordion */}
              <div className="mt-4 pt-3 border-t border-space-border">
                <button
                  onClick={() => toggleSpec(i)}
                  aria-expanded={isExpanded}
                  aria-controls={specId}
                  className="w-full flex items-center justify-between text-[11px] font-mono text-[#A99BBF] hover:text-white transition-colors focus-ring rounded-lg p-1"
                >
                  <span className="flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-purple-300" />
                    <span>Technical Sensor Specifications</span>
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isExpanded && (
                  <p 
                    id={specId} 
                    className="mt-2.5 p-3 rounded-lg bg-black/40 text-xs font-mono text-slate-300 leading-relaxed border border-white/5 animate-fadeIn"
                  >
                    {inst.technical_description || 'Detailed engineering specifications unavailable in current telemetry manifest.'}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
