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
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isSelected = activeTab === t.id;

          return (
            <button
              key={t.id}
              onClick={() => onSelectTab(t.id)}
              className={`shrink-0 px-4 py-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                isSelected
                  ? 'bg-space-cyan text-space-black border-space-cyan shadow-cyan-glow'
                  : 'bg-space-navy/80 hover:bg-space-navy text-slate-300 border-space-border hover:border-space-cyan/40'
              }`}
            >
              <div className={`p-2 rounded-xl ${isSelected ? 'bg-space-black/15 text-space-black' : 'bg-white/5 text-space-cyan'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <span className={`text-xs font-mono font-bold block ${isSelected ? 'text-space-black' : 'text-white'}`}>
                  {t.label}
                </span>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-space-black/80' : 'text-slate-400'}`}>
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
            <Layers className="w-3.5 h-3.5 text-space-cyan" />
            <span>Difficulty Tier:</span>
          </span>
          {TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => onSelectTier(tier.id)}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                activeTier === tier.id
                  ? 'bg-space-violet text-white font-bold border border-space-violet'
                  : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
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
