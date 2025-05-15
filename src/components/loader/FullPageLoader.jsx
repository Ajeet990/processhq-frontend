import React from 'react';

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Multi-layer spinner */}
        <div className="relative h-16 w-16">
          {/* Outer ring - fast spin */}
          <div 
            className="absolute h-full w-full rounded-full border-4 border-t-blue-600 border-r-blue-600 border-b-transparent border-l-transparent"
            style={{ animation: 'spin 1s linear infinite' }}
          />
          
          {/* Middle ring - medium spin */}
          <div 
            className="absolute h-3/4 w-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent"
            style={{ animation: 'spin 1.5s linear infinite' }}
          />
          
          {/* Inner ring - slow spin */}
          <div 
            className="absolute h-1/2 w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-t-blue-400 border-r-blue-400 border-b-transparent border-l-transparent"
            style={{ animation: 'spin 2s linear infinite' }}
          />
        </div>
        
        {/* Loading text */}
        <p className="mt-6 text-gray-600 text-lg font-medium">
          Loading<span className="animate-pulse">...</span>
        </p>
      </div>

      {/* Global styles for the spinner animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
};

export default FullPageLoader;