import React from 'react';

const STATUS_CONFIG = {
  OPERATIONAL: {
    label: 'Operational',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
    pulse: true
  },
  INACTIVE_SURFACE: {
    label: 'Resting on Surface',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    text: 'text-slate-300',
    dot: 'bg-slate-400',
    pulse: false
  },
  DEEP_SPACE_TRAVELLING: {
    label: 'Deep Space (Silent)',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-300',
    dot: 'bg-purple-400',
    pulse: true
  },
  ATMOSPHERIC_ENTRY_DESTROYED: {
    label: 'Mission Concluded (Entry)',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    dot: 'bg-amber-400',
    pulse: false
  },
  LOST_CONTACT: {
    label: 'Lost Contact',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    dot: 'bg-rose-400',
    pulse: false
  }
};

export default function StatusBadge({ status, size = 'md', verifiedDate }) {
  const config = STATUS_CONFIG[status] || {
    label: status || 'Unknown',
    bg: 'bg-slate-800',
    border: 'border-slate-700',
    text: 'text-slate-400',
    dot: 'bg-slate-500',
    pulse: false
  };

  const isSmall = size === 'sm';

  return (
    <div className="inline-flex items-center gap-1.5 flex-wrap">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full font-mono border backdrop-blur-md ${config.bg} ${config.border} ${config.text} ${
          isSmall ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
        }`}
      >
        <span className="relative flex h-2 w-2">
          {config.pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`}
            />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`} />
        </span>
        <span className="font-medium tracking-wide">{config.label}</span>
      </span>

      {verifiedDate && (
        <span className="text-[10px] text-slate-400 font-mono" title={`Last verified against NASA records on ${verifiedDate}`}>
          (Verified {verifiedDate.slice(0, 7)})
        </span>
      )}
    </div>
  );
}
