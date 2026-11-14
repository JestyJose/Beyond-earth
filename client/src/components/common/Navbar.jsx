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
    <header className="fixed top-0 left-0 right-0 z-50 bg-space-black/75 backdrop-blur-xl border-b border-space-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-space-violet to-space-cyan flex items-center justify-center shadow-cyan-glow group-hover:scale-105 transition-transform">
              <Rocket className="w-5 h-5 text-space-black" />
            </div>
            <div>
              <span className="font-heading font-bold text-lg tracking-wider text-white group-hover:text-space-cyan transition-colors">
                BEYOND<span className="text-space-cyan">EARTH</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-space-cyan/10 text-space-cyan border border-space-cyan/20">
                NASA Digital Museum
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-space-cyan/15 text-space-cyan border border-space-cyan/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-space-cyan' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-space-navy/95 border-b border-space-border px-4 pt-2 pb-6 space-y-1 backdrop-blur-2xl">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-space-cyan/20 text-space-cyan border border-space-cyan/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-space-cyan' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
