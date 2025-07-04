import React, { useState, useEffect } from 'react';
import { waitlistAPI } from '../services/api';

const WaitlistForm = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    status: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiStatus, setApiStatus] = useState('checking');

  const statusOptions = [
    { value: 'student', label: 'Student' },
    { value: 'educator', label: 'Educator' },
    { value: 'professional', label: 'Professional' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'other', label: 'Other' }
  ];

  // Test API connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        await waitlistAPI.healthCheck();
        setApiStatus('connected');
      } catch (error) {
        console.error('API connection test failed:', error);
        setApiStatus('disconnected');
      }
    };
    
    testConnection();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.status) {
      newErrors.status = 'Please select your status';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (apiStatus === 'disconnected') {
      onError('Backend server is not available. Please try again later.');
      return;
    }

    setLoading(true);
    
    try {
      const response = await waitlistAPI.addEntry(formData);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        status: 'student'
      });
      
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      if (error.errors) {
        // Handle validation errors from backend
        const backendErrors = {};
        error.errors.forEach(err => {
          backendErrors[err.field] = err.message;
        });
        setErrors(backendErrors);
      }
      
      if (onError) {
        onError(error.message || 'Failed to join waitlist. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card shadow-lg border border-thinq-blue-200 animate-slide-up">
        <div className="text-center mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-thinq-blue-600 mb-2">
            Join the Waitlist
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Be the first to experience ThinqScribe when we launch
          </p>
          
          {/* API Status Indicator */}
          {apiStatus === 'checking' && (
            <div className="mt-2 text-xs sm:text-sm text-thinq-blue-500">
              <div className="inline-flex items-center">
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-thinq-blue-500 mr-2"></div>
                Checking connection...
              </div>
            </div>
          )}
          
          {apiStatus === 'disconnected' && (
            <div className="mt-2 text-xs sm:text-sm text-red-600 bg-red-50 p-2 rounded">
              ⚠️ Backend server not available. Form will not work.
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="firstName" className="label text-xs sm:text-sm">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`input-field text-sm ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              placeholder="Enter your first name"
              disabled={loading || apiStatus === 'disconnected'}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="label text-xs sm:text-sm">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`input-field text-sm ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              placeholder="Enter your last name"
              disabled={loading || apiStatus === 'disconnected'}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="label text-xs sm:text-sm">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`input-field text-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              placeholder="Enter your email address"
              disabled={loading || apiStatus === 'disconnected'}
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="status" className="label text-xs sm:text-sm">
              I am a...
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={`input-field text-sm ${errors.status ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              disabled={loading || apiStatus === 'disconnected'}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.status}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || apiStatus === 'disconnected'}
            className={`w-full btn-primary text-sm sm:text-base py-2 sm:py-3 ${(loading || apiStatus === 'disconnected') ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                <span className="text-sm">Joining Waitlist...</span>
              </div>
            ) : (
              'Join Waitlist'
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            By joining our waitlist, you'll be among the first to know when ThinqScribe launches.
            We respect your privacy and won't spam you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaitlistForm;