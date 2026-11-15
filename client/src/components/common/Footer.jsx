import React from 'react';
import { Rocket, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-purple-500/15 bg-[#0D081B]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-500 to-purple-400 flex items-center justify-center shadow-violet-glow">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-lg tracking-wider text-white">
                BEYOND<span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">EARTH</span>
              </span>
            </div>
            <p className="text-sm text-[#A99BBF] max-w-md leading-relaxed">
              An educational digital museum and telemetry visualizer built for the NASA Space Apps Challenge. Chronicling human ingenuity, scientific instruments, and robotic artifacts left across the solar system since 1960.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Scientifically verified against NASA NSSDCA & JPL archives.</span>
            </div>
          </div>

          {/* Quick Exploration */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[#F5F0FF] uppercase tracking-wider mb-3">
              Museum Wings
            </h4>
            <ul className="space-y-2 text-sm text-[#A99BBF]">
              <li>
                <Link to="/solar-system" className="hover:text-purple-300 transition-colors focus-ring rounded">
                  Solar System Explorer
                </Link>
              </li>
              <li>
                <Link to="/hardware" className="hover:text-purple-300 transition-colors focus-ring rounded">
                  Hardware Explorer
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="hover:text-purple-300 transition-colors focus-ring rounded">
                  Mission Timeline (1960s+)
                </Link>
              </li>
              <li>
                <Link to="/science" className="hover:text-purple-300 transition-colors focus-ring rounded">
                  Science Behind the Machine
                </Link>
              </li>
              <li>
                <Link to="/academy" className="hover:text-purple-300 transition-colors focus-ring rounded">
                  Space Academy Challenges
                </Link>
              </li>
            </ul>
          </div>

          {/* Official NASA Archives */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[#F5F0FF] uppercase tracking-wider mb-3">
              Primary Sources
            </h4>
            <ul className="space-y-2 text-sm text-[#A99BBF]">
              <li>
                <a
                  href="https://nssdc.gsfc.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="NASA NSSDCA Master Catalog (opens in a new tab)"
                  className="flex items-center gap-1.5 hover:text-purple-300 transition-colors focus-ring rounded"
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
                  aria-label="NASA JPL Missions (opens in a new tab)"
                  className="flex items-center gap-1.5 hover:text-purple-300 transition-colors focus-ring rounded"
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
                  aria-label="NASA Planetary Data System (opens in a new tab)"
                  className="flex items-center gap-1.5 hover:text-purple-300 transition-colors focus-ring rounded"
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
                  aria-label="NASA Eyes on the Solar System (opens in a new tab)"
                  className="flex items-center gap-1.5 hover:text-purple-300 transition-colors focus-ring rounded"
                >
                  <span>NASA Eyes on the Solar System</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-purple-500/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A99BBF]/70 gap-4">
          <p>© 2026 Beyond Earth Project. Open-access educational platform.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400" /> for young space scientists worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
