import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Calendar, 
  Award, 
  Layers
} from 'lucide-react';

const TABS = [
  { id: 'quizzes', label: 'Mission Exams', icon: GraduationCap, tag: '6 Quizzes' },
  { id: 'simulations', label: 'Mission Simulator', icon: Sparkles, tag: '4 Scenarios' },
  { id: 'daily', label: 'Daily Challenge', icon: Calendar, tag: 'Daily +50 PTS' },
  { id: 'trophy', label: 'Trophy Room', icon: Award, tag: '8 Badges' },
];

const TIERS = [
  { id: '', label: 'All Tiers' },
  { id: 'CADET', label: 'Cadet (Beginner)' },
  { id: 'EXPLORER', label: 'Explorer (Intermediate)' },
  { id: 'COMMANDER', label: 'Commander (Advanced)' },
];

export default function LearningPathSelector({
  activeTab,
  onSelectTab,
  activeTier,
  onSelectTier
}) {
  return (
    <div className="mb-8 space-y-4">
      {/* Primary Mode Tabs */}
      <div role="tablist" aria-label="Space Academy learning paths" className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isSelected = activeTab === t.id;

          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isSelected}
              id={`academy-tab-${t.id}`}
              aria-controls={`academy-panel-${t.id}`}
              onClick={() => onSelectTab(t.id)}
              className={`shrink-0 px-4 py-3 rounded-2xl border text-left transition-all flex items-center gap-3 focus-ring ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white border-purple-400 shadow-violet-glow'
                  : 'bg-space-navy/80 hover:bg-[#1A1230] text-slate-300 border-space-border hover:border-purple-400/50'
              }`}
            >
              <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-purple-900/40 text-purple-300 border border-purple-500/20'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold block text-white">
                  {t.label}
                </span>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-purple-100' : 'text-[#A99BBF]'}`}>
                  {t.tag}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sub-tier Pills (Only visible when activeTab === 'quizzes') */}
      {activeTab === 'quizzes' && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-space-border text-xs font-mono">
          <span className="text-slate-400 mr-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-purple-300" />
            <span>Difficulty Tier:</span>
          </span>
          {TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => onSelectTier(tier.id)}
              aria-pressed={activeTier === tier.id}
              className={`px-3 py-1.5 rounded-xl transition-colors focus-ring ${
                activeTier === tier.id
                  ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold border border-purple-400/60 shadow-violet-glow'
                  : 'text-slate-400 hover:text-white bg-white/5 hover:bg-purple-950/30'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
