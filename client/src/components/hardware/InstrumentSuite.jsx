import React, { useState } from 'react';
import { Cpu, ChevronDown, ChevronUp, Eye, Radio } from 'lucide-react';

export default function InstrumentSuite({ instruments = [] }) {
  const [expandedSpecs, setExpandedSpecs] = useState({});

  const toggleSpec = (idx) => {
    setExpandedSpecs(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  if (!instruments || instruments.length === 0) return null;

  return (
    <div id="instruments" className="glass-panel p-6 sm:p-8 rounded-3xl mb-10 border border-space-border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-space-border gap-2 mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-space-cyan block">
            Scientific Payload
          </span>
          <h3 className="font-heading font-bold text-2xl text-white">
            The Machine’s Senses ({instruments.length} Scientific Instruments)
          </h3>
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Click an instrument to inspect technical flight telemetry
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {instruments.map((inst, i) => {
          const isExpanded = !!expandedSpecs[i];
          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-space-navy/70 border border-space-border hover:border-space-cyan/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading font-bold text-base text-white">
                    {inst.name}
                  </h4>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-space-cyan/15 text-space-cyan border border-space-cyan/30">
                    {inst.acronym}
                  </span>
                </div>

                {/* Student-Friendly Metaphor Explanation */}
                <div className="mt-3 p-3.5 rounded-xl bg-space-card/80 border border-white/5">
                  <span className="text-[10.5px] font-mono uppercase tracking-wider text-space-cyan block mb-1 font-bold">
                    How it works for young scientists:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {inst.purpose_student_friendly}
                  </p>
                </div>
              </div>

              {/* Technical Specifications Accordion */}
              <div className="mt-4 pt-3 border-t border-space-border">
                <button
                  onClick={() => toggleSpec(i)}
                  className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-space-cyan" />
                    <span>Technical Sensor Specifications</span>
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isExpanded && (
                  <p className="mt-2.5 p-3 rounded-lg bg-black/40 text-xs font-mono text-slate-300 leading-relaxed border border-white/5 animate-fadeIn">
                    {inst.technical_description}
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
