import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import SolarSystemPage from './pages/SolarSystemPage';
import HardwarePage from './pages/HardwarePage';
import HardwareDetailPage from './pages/HardwareDetailPage';
import TimelinePage from './pages/TimelinePage';
import SciencePage from './pages/SciencePage';
import StatusTrackerPage from './pages/StatusTrackerPage';
import AcademyPage from './pages/AcademyPage';

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
      <div className="flex flex-col min-h-screen bg-space-black text-slate-100">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solar-system" element={<SolarSystemPage />} />
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
    </BrowserRouter>
  );
}
