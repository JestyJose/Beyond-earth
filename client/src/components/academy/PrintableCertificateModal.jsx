import React, { useState, useEffect } from 'react';
import { X, Printer, Award, Sparkles, Check, Info } from 'lucide-react';

export default function PrintableCertificateModal({
  userPoints = 0,
  unlockedBadges = [],
  onClose
}) {
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('beyond_earth_student_name') || 'Cadet Explorer';
  });
  const [selectedPath, setSelectedPath] = useState('Comprehensive Planetary Exploration');
  const [issueDate] = useState(() => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  const handleNameChange = (val) => {
    setStudentName(val);
    localStorage.setItem('beyond_earth_student_name', val);
  };

  const handlePrint = () => {
    window.print();
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-space-black/85 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close */}
      <div className="fixed inset-0 print:hidden" onClick={onClose} />

      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-space-border/80 shadow-2xl overflow-hidden z-10 bg-space-navy/95 max-h-[92vh] flex flex-col print:max-h-none print:w-full print:m-0 print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Modal Toolbar (Hidden during print) */}
        <div className="flex flex-wrap items-center justify-between p-5 border-b border-space-border gap-4 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-space-cyan" />
            <h3 className="font-heading font-bold text-lg text-white">
              Academy Completion Certificate
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-space-cyan text-space-black font-mono font-bold text-xs hover:bg-space-cyan/90 transition-all shadow-cyan-glow"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate (PDF)</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close certificate dialog"
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customization Bar (Hidden during print) */}
        <div className="p-4 sm:px-6 bg-space-black/50 border-b border-space-border flex flex-wrap items-center gap-4 text-xs font-mono print:hidden">
          <div className="flex-1 min-w-[200px]">
            <label className="text-slate-400 block mb-1">Cadet Name:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter your name..."
              className="w-full px-3 py-1.5 bg-space-navy border border-space-border rounded-lg text-white focus:outline-none focus:border-space-cyan"
            />
          </div>

          <div className="flex-1 min-w-[240px]">
            <label className="text-slate-400 block mb-1">Learning Track / Specialization:</label>
            <select
              value={selectedPath}
              onChange={(e) => setSelectedPath(e.target.value)}
              className="w-full px-3 py-1.5 bg-space-navy border border-space-border rounded-lg text-white focus:outline-none focus:border-space-cyan"
            >
              <option value="Comprehensive Planetary Exploration">Comprehensive Planetary Exploration</option>
              <option value="Cadet Flight & Lunar Pioneers">Cadet Flight & Lunar Pioneers</option>
              <option value="Deep Space Propulsion & Mars Surface">Deep Space Propulsion & Mars Surface</option>
              <option value="Interstellar Physics & Astrophysics">Interstellar Physics & Astrophysics</option>
              <option value="Autonomous Mission Controller Simulation">Autonomous Mission Controller Simulation</option>
            </select>
          </div>
        </div>

        {/* Certificate Printable Area */}
        <div className="p-6 sm:p-10 overflow-y-auto print:overflow-visible print:p-0">
          <div className="relative p-8 sm:p-12 rounded-3xl border-4 border-amber-400/50 bg-gradient-to-br from-space-navy/95 via-space-black to-space-navy/95 text-center text-white shadow-2xl overflow-hidden print:border-8 print:border-black print:bg-white print:text-black print:rounded-none">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

            {/* Header Emblems */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-xs font-mono uppercase tracking-widest mb-3 print:text-black print:border-black">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 print:text-black" />
              <span>Beyond Earth • Space Exploration Academy</span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl uppercase tracking-wider text-white print:text-black mb-2">
              Certificate of Space Exploration
            </h1>

            <p className="text-xs sm:text-sm font-mono text-space-cyan uppercase tracking-widest mb-6 print:text-black">
              Achievement & Flight Telemetry Recognition
            </p>

            <div className="w-24 h-0.5 bg-amber-400/50 mx-auto mb-6 print:bg-black" />

            <p className="text-xs sm:text-sm text-slate-300 print:text-black max-w-xl mx-auto mb-2">
              This certifies that Space Academy Cadet
            </p>

            {/* Recipient Name */}
            <div className="text-2xl sm:text-4xl font-heading font-extrabold text-amber-300 print:text-black tracking-tight mb-2 underline decoration-amber-400/40">
              {studentName || 'Cadet Explorer'}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 print:text-black max-w-xl mx-auto leading-relaxed mb-6">
              has demonstrated distinguished competence in <strong>{selectedPath}</strong>, mastering the science of robotic spacecraft, planetary geology, and autonomous flight mission control.
            </p>

            {/* Stats Bar */}
            <div className="inline-flex flex-wrap items-center justify-center gap-6 px-6 py-2 rounded-2xl bg-white/5 border border-white/10 mb-8 print:border-black print:bg-transparent">
              <div className="text-xs font-mono">
                <span className="text-slate-400 block text-[10px] print:text-black">SCORE ACCREDITED</span>
                <span className="font-bold text-space-cyan print:text-black">{userPoints} PTS</span>
              </div>
              <div className="text-xs font-mono">
                <span className="text-slate-400 block text-[10px] print:text-black">BADGES EARNED</span>
                <span className="font-bold text-amber-400 print:text-black">{unlockedBadges.length} / 8 BADGES</span>
              </div>
              <div className="text-xs font-mono">
                <span className="text-slate-400 block text-[10px] print:text-black">DATE CONFERRED</span>
                <span className="font-bold text-white print:text-black">{issueDate}</span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="flex flex-col sm:flex-row items-center justify-between max-w-lg mx-auto gap-6 pt-6 border-t border-white/10 print:border-black">
              <div className="text-center sm:text-left">
                <div className="font-heading font-bold text-sm text-white print:text-black">
                  Beyond Earth Directorate
                </div>
                <div className="text-[10px] font-mono text-slate-400 print:text-black">
                  NASA Space Apps Challenge
                </div>
              </div>

              {/* Digital Gold Seal */}
              <div className="w-16 h-16 rounded-full border-2 border-amber-400 bg-amber-400/10 flex items-center justify-center text-center p-1 print:border-black">
                <span className="text-[8px] font-mono font-bold uppercase text-amber-300 print:text-black leading-tight">
                  Official Educational Seal
                </span>
              </div>

              <div className="text-center sm:text-right">
                <div className="font-heading font-bold text-sm text-white print:text-black">
                  Flight Telemetry Verified
                </div>
                <div className="text-[10px] font-mono text-slate-400 print:text-black">
                  Autonomous Space Academy
                </div>
              </div>
            </div>

            {/* Educational Disclaimer */}
            <div className="mt-8 pt-4 border-t border-white/5 print:border-black/20 text-[9.5px] font-mono text-slate-400 print:text-black/60 max-w-md mx-auto">
              Notice: This certificate is issued by the Beyond Earth Educational Museum for classroom and personal STEM recognition. It is not an official government or NASA employment credential.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
