import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Cpu, 
  Calendar, 
  Rocket, 
  Zap, 
  Weight, 
  Sparkles, 
  History, 
  ExternalLink, 
  ShieldCheck, 
  Compass,
  Radio
} from 'lucide-react';
import { api } from '../services/api';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function HardwareDetailPage() {
  const { slug } = useParams();
  const [hardware, setHardware] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('instruments');

  useEffect(() => {
    async function loadDetail() {
      setLoading(true);
      try {
        const data = await api.getHardwareBySlug(slug);
        setHardware(data);
      } catch (err) {
        console.error('Failed to load hardware detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-deep-space">
        <LoadingSpinner message="Retrieving spacecraft telemetry & instrument specs..." />
      </div>
    );
  }

  if (!hardware) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-deep-space text-center">
        <div className="max-w-md mx-auto p-8 glass-panel rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-2">Spacecraft Not Found</h2>
          <p className="text-sm text-slate-400 mb-4">The requested spacecraft record does not exist or telemetry was lost.</p>
          <Link
            to="/hardware"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-space-cyan text-space-black font-semibold text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hardware Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-deep-space">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link
          to="/hardware"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-space-cyan transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hardware Explorer
        </Link>

        {/* Hero Card */}
        <div className="glass-panel rounded-3xl overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Column */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[420px] bg-space-navy">
              <img
                src={hardware.image_url}
                alt={hardware.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-card/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-space-card/90" />
            </div>

            {/* Info Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-space-cyan">
                    {hardware.category.replace(/_/g, ' ')}
                  </span>
                  <StatusBadge 
                    status={hardware.operational_status} 
                    verifiedDate={hardware.status_verified_date} 
                  />
                </div>

                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  {hardware.name}
                </h1>

                <div className="mt-2 flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Compass className="w-4 h-4 text-space-cyan" />
                  <span>Destination:</span>
                  <span className="text-white font-semibold">{hardware.destination_details?.name || hardware.destination_slug}</span>
                </div>

                {/* Status Summary Banner */}
                <div className="mt-4 p-3.5 rounded-xl bg-space-navy/90 border border-space-border text-xs text-slate-300 leading-relaxed">
                  <strong className="text-space-cyan font-mono block mb-1">
                    STATUS VERIFICATION (As of {hardware.status_verified_date}):
                  </strong>
                  {hardware.status_summary}
                </div>

                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                  {hardware.mission_purpose}
                </p>
              </div>

              {/* Quick Specs Grid */}
              <div className="mt-6 pt-6 border-t border-space-border grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white/5">
                  <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                    <Calendar className="w-3.5 h-3.5 text-space-cyan" />
                    <span>Launch</span>
                  </div>
                  <div className="text-white font-semibold">{hardware.launch_date}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/5">
                  <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                    <Rocket className="w-3.5 h-3.5 text-space-violet" />
                    <span>Rocket</span>
                  </div>
                  <div className="text-white font-semibold truncate" title={hardware.launch_vehicle}>
                    {hardware.launch_vehicle}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/5">
                  <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Power</span>
                  </div>
                  <div className="text-white font-semibold truncate" title={hardware.power_source}>
                    {hardware.power_source.split(' ')[0]}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/5">
                  <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                    <Weight className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mass</span>
                  </div>
                  <div className="text-white font-semibold">
                    {hardware.mass_kg ? `${hardware.mass_kg} kg` : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Significance Box */}
        <div className="glass-panel p-6 rounded-2xl mb-8 border-l-4 border-l-space-cyan">
          <h3 className="font-heading font-bold text-lg text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-space-cyan" />
            Historical Significance
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {hardware.historical_significance}
          </p>
        </div>

        {/* Tabbed Detail Section */}
        <div className="mb-6 flex border-b border-space-border gap-2 sm:gap-6 overflow-x-auto text-sm">
          {[
            { id: 'instruments', label: 'Scientific Instruments', count: hardware.instruments?.length },
            { id: 'milestones', label: 'Mission Milestones', count: hardware.milestones?.length },
            { id: 'discoveries', label: 'Key Discoveries', count: hardware.discoveries?.length },
            { id: 'sources', label: 'Official NASA Sources', count: hardware.sources?.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 font-medium whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === tab.id
                  ? 'border-space-cyan text-space-cyan font-semibold'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/10">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content 1: Scientific Instruments */}
        {activeTab === 'instruments' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400 font-mono mb-2">
              Every instrument is designed by NASA engineers to measure specific astrophysical or geological phenomena:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hardware.instruments?.map((inst, i) => (
                <div key={i} className="glass-panel p-5 rounded-2xl border border-space-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-heading font-bold text-base text-white">
                      {inst.name}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-space-cyan/15 text-space-cyan border border-space-cyan/30">
                      {inst.acronym}
                    </span>
                  </div>
                  <div className="mt-3 p-3 rounded-xl bg-space-navy/60 border border-white/5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-space-cyan block mb-1">
                      Student Explanation:
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {inst.purpose_student_friendly}
                    </p>
                  </div>
                  <div className="mt-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                      Technical Specification:
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono">
                      {inst.technical_description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 2: Milestones */}
        {activeTab === 'milestones' && (
          <div className="relative pl-6 border-l-2 border-space-cyan/30 space-y-6 my-4">
            {hardware.milestones?.map((m, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-space-black border-2 border-space-cyan" />
                <div className="glass-panel p-4 rounded-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs text-space-cyan font-semibold">
                      {m.date}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
                      {m.event_type}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-white">
                    {m.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 3: Discoveries */}
        {activeTab === 'discoveries' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hardware.discoveries?.map((disc, i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl border border-space-border flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-space-violet mb-1">
                    {disc.scientific_domain}
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white mb-2">
                    {disc.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {disc.plain_english_summary}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-space-violet/10 border border-space-violet/20">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-space-violet block mb-0.5 font-bold">
                    Why It Matters:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {disc.why_it_matters}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 4: Verified Sources */}
        {activeTab === 'sources' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-300 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium mb-1">
                  Scientific Accuracy & Provenance
                </strong>
                All mission dates, instrument specifications, and telemetry records for this spacecraft are corroborated by NASA’s primary scientific archives.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hardware.sources?.map((src, i) => (
                <div key={i} className="glass-panel p-5 rounded-2xl border border-space-border">
                  <div className="text-[10px] font-mono uppercase text-space-cyan mb-1">
                    {src.source_type}
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white mb-1">
                    {src.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mb-3">
                    {src.quotation_or_reference}
                  </p>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-space-cyan hover:underline"
                  >
                    <span>Inspect NASA Record</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
