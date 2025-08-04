import React from 'react';
import Header from '../layout/header';
import HeroSection from './HeroSection';
import TaskViewsShowcase from './TaskViewsShowcase';
import NoteTakingSection from './NoteTakingSection';
import AITaskManagement from './AITaskManagement';
import CTASection from './CTASection';
import Footer from '../layout/footer';

const Notix = () => {
  return (
    <div className="min-h-screen bg-gray-300 font-['Inter',sans-serif]">
      <Header />
      <HeroSection />
      <TaskViewsShowcase />
      <NoteTakingSection />
      <AITaskManagement />
      <CTASection />
      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Notix;