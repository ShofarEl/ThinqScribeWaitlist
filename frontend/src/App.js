import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import WaitlistForm from './components/WaitlistForm';
import WaitlistTable from './components/WaitlistTable';

// Header component
const Header = () => {
  const location = useLocation();
  
  return (
    <header className="relative">
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-white font-bold text-xl ml-4">ThinqScribe</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
          <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
        </div>
      </nav>

      {/* Navigation tabs */}
      <div className="flex justify-center space-x-1 px-6 max-w-7xl mx-auto">
        <Link
          to="/"
          className={`px-6 py-2 rounded-t-lg transition-all duration-200 ${
            location.pathname === '/'
              ? 'bg-white text-thinq-blue-600 font-semibold'
              : 'text-white hover:bg-white hover:bg-opacity-20'
          }`}
        >
          Join Waitlist
        </Link>
        <Link
          to="/admin"
          className={`px-6 py-2 rounded-t-lg transition-all duration-200 ${
            location.pathname === '/admin'
              ? 'bg-white text-thinq-blue-600 font-semibold'
              : 'text-white hover:bg-white hover:bg-opacity-20'
          }`}
        >
          Admin View
        </Link>
      </div>
    </header>
  );
};

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

// Home page component
const HomePage = () => {
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
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero content */}
          <div className="text-center lg:text-left">
            <h1 className="text-display-xl font-display text-white mb-6 animate-fade-in">
              FOR<br />
              YOU<span className="text-4xl">...</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-8 animate-fade-in">
              ThinqScribe Is For You If...
            </h2>
            <div className="space-y-4 text-lg text-white opacity-90 animate-slide-up">
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
      <footer className="text-center py-6">
        <div className="flex items-center justify-center space-x-2 text-white">
          <span className="font-semibold">ThinqScribe</span>
          <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
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
};

// Admin page component
const AdminPage = () => {
  return (
    <div className="min-h-screen bg-thinq-gradient">
      <Header />
      
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Waitlist Dashboard
            </h1>
            <p className="text-white opacity-90">
              Manage and view all waitlist entries
            </p>
          </div>
          
          <WaitlistTable />
        </div>
      </main>
    </div>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 