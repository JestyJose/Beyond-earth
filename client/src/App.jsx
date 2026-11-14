import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import CosmicBackground from './components/common/CosmicBackground';

import HomePage from './pages/HomePage';
import HardwarePage from './pages/HardwarePage';
import HardwareDetailPage from './pages/HardwareDetailPage';
import TimelinePage from './pages/TimelinePage';
import SciencePage from './pages/SciencePage';
import StatusTrackerPage from './pages/StatusTrackerPage';
import AcademyPage from './pages/AcademyPage';

// Lazy load the heavy 3D Three.js Solar System Explorer on demand
const SolarSystemPage = lazy(() => import('./pages/SolarSystemPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-space-black text-space-text relative selection:bg-purple-600/35 selection:text-purple-200">
        <CosmicBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/solar-system"
              element={
                <Suspense
                  fallback={
                    <div className="min-h-screen pt-28 bg-deep-space flex items-center justify-center">
                      <LoadingSpinner message="Calibrating 3D planetary physics engine & textures..." />
                    </div>
                  }
                >
                  <SolarSystemPage />
                </Suspense>
              }
            />
            <Route path="/hardware" element={<HardwarePage />} />
            <Route path="/hardware/:slug" element={<HardwareDetailPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/science" element={<SciencePage />} />
            <Route path="/status-tracker" element={<StatusTrackerPage />} />
            <Route path="/academy" element={<AcademyPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
