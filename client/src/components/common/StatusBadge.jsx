import React from 'react';
import { 
  Radio, 
  MapPin, 
  Compass, 
  Flame, 
  ShieldAlert, 
  WifiOff, 
  HelpCircle 
} from 'lucide-react';

const STATUS_CONFIG = {
  OPERATIONAL: {
    label: 'Operational',
    icon: Radio,
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
    pulse: true
  },
  INACTIVE_SURFACE: {
    label: 'Resting on Surface',
    icon: MapPin,
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    text: 'text-slate-300',
    dot: 'bg-slate-400',
    pulse: false
  },
  DEEP_SPACE_TRAVELLING: {
    label: 'Deep Space (Silent)',
    icon: Compass,
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-300',
    dot: 'bg-purple-400',
    pulse: true
  },
  ATMOSPHERIC_ENTRY_DESTROYED: {
    label: 'Mission Concluded (Entry)',
    icon: Flame,
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    dot: 'bg-amber-400',
    pulse: false
  },
  SURFACE_IMPACT_DESTROYED: {
    label: 'Surface Impact (Concluded)',
    icon: ShieldAlert,
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-300',
    dot: 'bg-amber-300',
    pulse: false
  },
  LOST_CONTACT: {
    label: 'Lost Contact',
    icon: WifiOff,
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    dot: 'bg-rose-400',
    pulse: false
  }
};

export default function StatusBadge({ status, size = 'md', verifiedDate }) {
  const config = STATUS_CONFIG[status] || {
    label: status || 'Status Pending',
    icon: HelpCircle,
    bg: 'bg-slate-800',
    border: 'border-slate-700',
    text: 'text-slate-400',
    dot: 'bg-slate-500',
    pulse: false
  };

  const Icon = config.icon;
  const isSmall = size === 'sm';

  return (
    <div 
      className="inline-flex items-center gap-1.5 flex-wrap"
      aria-label={`Mission Status: ${config.label}${verifiedDate ? ` (Verified ${verifiedDate})` : ''}`}
    >
      <span
        className={`inline-flex items-center gap-1.5 rounded-full font-mono border backdrop-blur-md ${config.bg} ${config.border} ${config.text} ${
          isSmall ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
        }`}
      >
        <span className="relative flex h-2 w-2 items-center justify-center">
          {config.pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`}
              aria-hidden="true"
            />
          )}
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${config.dot}`} aria-hidden="true" />
        </span>
        <Icon className={`${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} shrink-0`} aria-hidden="true" />
        <span className="font-medium tracking-wide">{config.label}</span>
      </span>

      {verifiedDate && (
        <span 
          className="text-[10px] text-slate-400 font-mono" 
          title={`Last verified against NASA records on ${verifiedDate}`}
        >
          (Verified {verifiedDate.slice(0, 7)})
        </span>
      )}
    </div>
  );
}
