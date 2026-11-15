import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

import CinematicHero from '../components/hardware/CinematicHero';
import TelemetryDossier from '../components/hardware/TelemetryDossier';
import PhysicalFateCard from '../components/hardware/PhysicalFateCard';
import InstrumentSuite from '../components/hardware/InstrumentSuite';
import DiscoveryShowcase from '../components/hardware/DiscoveryShowcase';
import JourneyTimeline from '../components/hardware/JourneyTimeline';
import FastFactsCard from '../components/hardware/FastFactsCard';
import RelatedMissions from '../components/hardware/RelatedMissions';
import SourcesList from '../components/hardware/SourcesList';

export default function HardwareDetailPage() {
  const { slug } = useParams();
  const [hardware, setHardware] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fetchError, setFetchError] = useState(null);

  const loadDetail = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await api.getHardwareBySlug(slug);
      setHardware(data);
    } catch (err) {
      console.error('Failed to load hardware detail:', err);
      setFetchError(err.message || 'Telemetry connection failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  }, [slug]);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    } else {
      console.warn(`[Scroll] Target section "${sectionId}" not found in current document.`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-deep-space">
        <LoadingSpinner message="Retrieving NASA spacecraft telemetry & flight chronicles..." />
      </div>
    );
  }

  if (fetchError || !hardware) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-deep-space text-center px-4">
        <div className="max-w-md mx-auto p-8 glass-panel rounded-3xl border border-purple-500/30 shadow-violet-glow">
          <h2 className="font-heading text-xl font-bold text-white mb-2">Spacecraft Telemetry Unavailable</h2>
          <p className="text-sm text-[#A99BBF] mb-6 leading-relaxed">
            {fetchError 
              ? `Unable to acquire deep-space communications: ${fetchError}.`
              : 'The requested spacecraft record does not exist or telemetry was lost in deep space.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={loadDetail}
              className="btn-violet inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs shadow-violet-glow focus-ring"
            >
              <span>Retry Telemetry Link</span>
            </button>
            <Link
              to="/hardware"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-space-navy border border-purple-500/30 text-slate-200 hover:text-white font-semibold text-xs focus-ring transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-purple-300" />
              <span>Hardware Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-deep-space">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Cinematic Hero Section */}
        <CinematicHero
          hardware={hardware}
          onScrollToSection={scrollToSection}
        />

        {/* Telemetry Dossier & Operating Horizon */}
        <TelemetryDossier hardware={hardware} />

        {/* Where is the Spacecraft Right Now? Physical Fate Card */}
        <PhysicalFateCard hardware={hardware} />

        {/* Scientific Payload & Senses */}
        <InstrumentSuite instruments={hardware.instruments} />

        {/* Major Discoveries & Why They Matter on Earth */}
        <DiscoveryShowcase discoveries={hardware.discoveries} />

        {/* Chronological Mission Flight Log */}
        <JourneyTimeline milestones={hardware.milestones} />

        {/* Cosmic Fast Facts for Young Scientists */}
        <FastFactsCard fastFacts={hardware.fast_facts} />

        {/* Connected Fleet & Sibling Probes */}
        <RelatedMissions relatedMissions={hardware.related_missions} />

        {/* Official NASA Archives & Provenance */}
        <SourcesList
          sources={hardware.sources}
          nssdcaId={hardware.nssdca_id}
        />
      </div>
    </div>
  );
}
