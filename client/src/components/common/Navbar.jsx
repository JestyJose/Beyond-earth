import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Rocket, 
  Compass, 
  Cpu, 
  History, 
  Sparkles, 
  Radio, 
  GraduationCap, 
  Menu, 
  X 
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Solar System', path: '/solar-system', icon: Compass },
  { name: 'Hardware', path: '/hardware', icon: Cpu },
  { name: 'Timeline', path: '/timeline', icon: History },
  { name: 'Science', path: '/science', icon: Sparkles },
  { name: 'Status Radar', path: '/status-tracker', icon: Radio },
  { name: 'Space Academy', path: '/academy', icon: GraduationCap },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080512]/80 backdrop-blur-2xl border-b border-purple-500/20 shadow-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-500 to-purple-400 flex items-center justify-center shadow-violet-glow group-hover:scale-105 transition-transform">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-heading font-bold text-lg tracking-wider text-white group-hover:text-purple-300 transition-colors">
                BEYOND<span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">EARTH</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-200 border border-purple-400/30">
                NASA Digital Museum
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600/20 text-[#F5F0FF] border border-purple-400/40 shadow-violet-glow font-semibold'
                      : 'text-[#A99BBF] hover:text-[#F5F0FF] hover:bg-purple-500/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-300' : 'text-purple-400/60'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-purple-200 hover:text-white hover:bg-purple-500/15 transition-colors border border-purple-500/20"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#110B20]/95 border-b border-purple-500/20 px-4 pt-2 pb-6 space-y-1.5 backdrop-blur-2xl shadow-glass">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-purple-600/25 text-[#F5F0FF] border border-purple-400/40 shadow-violet-glow'
                    : 'text-[#A99BBF] hover:text-[#F5F0FF] hover:bg-purple-500/10'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-300' : 'text-purple-400/60'}`} />
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
