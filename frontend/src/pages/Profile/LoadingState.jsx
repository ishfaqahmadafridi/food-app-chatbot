import React from 'react';

const LoadingState = () => {
  return (
    <div className="fixed w-full h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] overflow-y-auto top-0 left-0">
      <div className="max-w-[550px] w-[90%] max-h-[90vh] overflow-y-auto relative animate-[fadeIn_0.3s] my-5 mx-auto">
        <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] p-[30px_35px] min-h-fit">
          <p className="text-center text-gray-600 text-lg">Loading profile...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
