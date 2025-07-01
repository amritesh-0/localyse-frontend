import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex space-x-2 mb-2">
        <span className="w-3 h-3 bg-primary-600 rounded-full animate-bounce-dot1"></span>
        <span className="w-3 h-3 bg-primary-600 rounded-full animate-bounce-dot2"></span>
        <span className="w-3 h-3 bg-primary-600 rounded-full animate-bounce-dot3"></span>
      </div>
    </div>
  );
};

export default Loader;
