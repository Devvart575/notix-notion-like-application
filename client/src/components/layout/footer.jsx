import React from 'react';
import { CheckCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-yellow-400" />
            <span className="text-lg font-semibold">Notix</span>
          </div>
          <p className="text-gray-400">© 2025 Notix. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;