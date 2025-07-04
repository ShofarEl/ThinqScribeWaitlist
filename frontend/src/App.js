import React, { useState } from 'react';
import WaitlistForm from './components/WaitlistForm';

// Success message component
const SuccessMessage = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-auto animate-slide-up">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to the Waitlist!</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="btn-primary"
        >
          Got it!
        </button>
      </div>
    </div>
  </div>
);

// Error message component
const ErrorMessage = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-auto animate-slide-up">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
);

// Header component
const Header = () => {
  return (
    <header className="relative">
      <nav className="flex items-center justify-between p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <img src="/App-Icon-Light.png" alt="ThinqScribe Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
          <span className="text-white font-bold text-lg sm:text-xl ml-2">ThinqScribe</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
          <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
        </div>
      </nav>
    </header>
  );
};

// Main App component
function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');

  const handleSuccess = (response) => {
    setMessage(`Thank you for joining our waitlist! We'll keep you updated on ThinqScribe's launch.`);
    setShowSuccess(true);
  };

  const handleError = (errorMessage) => {
    setMessage(errorMessage);
    setShowError(true);
  };

  return (
    <div className="min-h-screen bg-thinq-gradient flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Hero content */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-display-xl font-display text-white mb-4 sm:mb-6 animate-fade-in">
              FOR<br />
              YOU<span className="text-2xl sm:text-4xl">...</span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-4 sm:mb-8 animate-fade-in">
              ThinqScribe Is For You If...
            </h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-white opacity-90 animate-slide-up">
              <p>You are an undergraduate or postgraduate student who loves to produce confident and quality academic work</p>
              <p>You want to streamline your research and writing process</p>
              <p>You need AI-powered assistance for academic excellence</p>
            </div>
          </div>

          {/* Right side - Waitlist form */}
          <div className="animate-slide-up">
            <WaitlistForm onSuccess={handleSuccess} onError={handleError} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 sm:py-6">
        <div className="flex items-center justify-center space-x-2 text-white">
          <span className="font-semibold text-sm sm:text-base">ThinqScribe</span>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white flex items-center justify-center">
            <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showSuccess && (
        <SuccessMessage
          message={message}
          onClose={() => setShowSuccess(false)}
        />
      )}

      {showError && (
        <ErrorMessage
          message={message}
          onClose={() => setShowError(false)}
        />
      )}
    </div>
  );
}

export default App; 