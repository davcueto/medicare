import React from 'react';

function Home() {
  return (
    <div className="mt-16 lg:mt-0">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">Vite + React</h1>
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <p className="text-gray-700 text-sm sm:text-base">
          Edit <code className="font-mono bg-gray-100 p-1 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-8 text-gray-500 text-center text-sm sm:text-base">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default Home;