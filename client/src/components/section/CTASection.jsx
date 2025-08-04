import React from 'react';
import { Zap } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="bg-blue-900 px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Productivity?</h2>
        <p className="text-blue-200 text-xl mb-12 max-w-2xl mx-auto">
          Join thousands of professionals who've already revolutionized their workflow with AI-powered task management.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-yellow-400 hover:bg-yellow-500 px-10 py-5 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-blue-900 flex items-center gap-3 justify-center">
            <Zap className="w-6 h-6" />
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;