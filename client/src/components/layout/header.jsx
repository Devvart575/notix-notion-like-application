import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'; //  import navigate hook

const Header = () => {
  const navigate = useNavigate(); // create navigate function
   const location = useLocation();

  return (
    <div className="sticky top-4 z-50 flex justify-center px-6">
      <header className="bg-gray-200 bg-opacity-80 backdrop-blur-sm px-6 py-3 flex justify-between items-center border border-gray-400 shadow-lg rounded-full max-w-4xl w-full">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-blue-900" />
          <span className="font-semibold text-base text-blue-900">Notix</span>
        </div>

        {/*  updated button with route navigation */}
        <button
          onClick={() => navigate('/auth/login', { state: { backgroundLocation: location } })}

          className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-blue-900"
        >
          Get Started
        </button>
      </header>
    </div>
  );
};

export default Header;
