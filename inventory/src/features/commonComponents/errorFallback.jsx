import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate.push('/');
  };

  return (
    <div role="alert" className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-semibold text-red-600">Oops! Something went wrong.</h2>
      <p className="text-gray-700 mt-2">An unexpected error has occurred. Please try one of the following options:</p>
      <pre className="mt-4 p-4 bg-gray-200 text-gray-700 rounded">{error.message}</pre>
      <div className="mt-6">
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none"
        >
          Try Again
        </button>
        <button
          onClick={handleHomeRedirect}
          className="ml-4 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 focus:outline-none"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;

