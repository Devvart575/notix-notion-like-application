import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Zap } from 'lucide-react';

const HeroSection = () => {
const navigate = useNavigate();
const location = useLocation();

  return (
    <section className="bg-gray-300 px-6 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-6xl font-bold text-blue-900 leading-tight animate-fade-in">
            Organize Your Life,<br />
            <span className="text-yellow-500">Unleash Your</span><br />
            Potential
          </h1>
          <p className="text-blue-800 text-xl leading-relaxed opacity-90">
            Notix is the all-in-one productivity tool that adapts to your workflow. From tasks and notes to projects and goals, we've got you covered with AI-powered prioritization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
               onClick={() => navigate('/auth/login', { state: { backgroundLocation: location } })}

              className="bg-yellow-400 hover:bg-yellow-500 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-blue-900 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Get Started - It's Free
            </button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-96 h-72 bg-white rounded-2xl shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-blue-900" />
                </div>
                <p className="text-blue-900 font-semibold">AI-Powered Productivity</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-900 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;