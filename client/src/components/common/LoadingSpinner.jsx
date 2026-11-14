import React from 'react';

export default function LoadingSpinner({ message = 'Acquiring deep space telemetry...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[300px]">
      <div className="relative w-16 h-16">
        {/* Orbital rings */}
        <div className="absolute inset-0 rounded-full border-2 border-space-cyan/20 border-t-space-cyan animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-space-violet/20 border-b-space-violet animate-spin [animation-duration:1.5s]" />
        <div className="absolute inset-4 rounded-full bg-space-cyan/30 animate-pulse" />
      </div>
      <p className="mt-4 text-xs font-mono uppercase tracking-widest text-space-cyan animate-pulse">
        {message}
      </p>
    </div>
  );
}
