import React from 'react';
import { Rocket, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-space-border bg-space-deep/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-space-violet to-space-cyan flex items-center justify-center">
                <Rocket className="w-4 h-4 text-space-black" />
              </div>
              <span className="font-heading font-bold text-lg tracking-wider text-white">
                BEYOND<span className="text-space-cyan">EARTH</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An educational digital museum and telemetry visualizer built for the NASA Space Apps Challenge. Chronicling human ingenuity, scientific instruments, and robotic artifacts left across the solar system since 1960.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Scientifically verified against NASA NSSDCA & JPL archives.</span>
            </div>
          </div>

          {/* Quick Exploration */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Museum Wings
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/solar-system" className="hover:text-space-cyan transition-colors">
                  Solar System Explorer
                </Link>
              </li>
              <li>
                <Link to="/hardware" className="hover:text-space-cyan transition-colors">
                  Hardware Explorer
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="hover:text-space-cyan transition-colors">
                  Mission Timeline (1960s+)
                </Link>
              </li>
              <li>
                <Link to="/science" className="hover:text-space-cyan transition-colors">
                  Science Behind the Machine
                </Link>
              </li>
              <li>
                <Link to="/academy" className="hover:text-space-cyan transition-colors">
                  Space Academy Challenges
                </Link>
              </li>
            </ul>
          </div>

          {/* Official NASA Archives */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Primary Sources
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href="https://nssdc.gsfc.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-space-cyan transition-colors"
                >
                  <span>NASA NSSDCA Master Catalog</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.jpl.nasa.gov/missions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-space-cyan transition-colors"
                >
                  <span>NASA JPL Missions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://pds.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-space-cyan transition-colors"
                >
                  <span>NASA Planetary Data System</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://eyes.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-space-cyan transition-colors"
                >
                  <span>NASA Eyes on the Solar System</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-space-border flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Beyond Earth Project. Open-access educational platform.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for young space scientists worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
