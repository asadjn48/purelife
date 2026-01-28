import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pill, Home, Search, MoveLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12 font-sans">
      <div className="max-w-lg w-full text-center">
        
        {/* Animated Icon */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-75" />
          <div className="relative bg-white p-6 rounded-full shadow-xl border-4 border-gray-50 flex items-center justify-center">
            <Pill size={64} className="text-primary rotate-45" />
          </div>
          {/* Floating particle effect */}
          <div className="absolute top-0 right-0 w-4 h-4 bg-secondary rounded-full animate-bounce delay-100" />
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-primary rounded-full animate-bounce delay-300" />
        </div>

        {/* Text Content */}
        <h1 className="text-6xl font-black text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-pharmacy-navy mb-4">
          Oops! This pill is hard to swallow.
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Intentionaly added by the Developer
          {/* The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. */}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <MoveLeft size={20} />
            Go Back
          </button>
          
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>

        {/* Quick Search */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-600 mb-4">Try searching for products instead:</p>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search medicines, vitamins..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          {/* Quick Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Vitamins', 'Pain Relief', 'Skincare', 'Baby Care'].map((tag) => (
              <Link 
                key={tag}
                to={`/products?search=${tag}`}
                className="text-xs font-medium text-primary bg-primary/5 px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;