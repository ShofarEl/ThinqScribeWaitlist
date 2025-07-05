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
  const [apiStatus, setApiStatus] = useState('connected'); // Default to connected for better UX

  const statusOptions = [
    { value: 'student', label: 'Student' },
    { value: 'educator', label: 'Educator' },
    { value: 'professional', label: 'Professional' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'other', label: 'Other' }
  ];

  // Test API connection on component mount (silently)
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
      onError('Unable to process your request. Please try again later.');
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
      <div className="card shadow-lg border border-thinq-blue-200 animate-slide-up hover:shadow-xl transition-all duration-300">
        <div className="text-center mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-thinq-blue-600 mb-2">
            Join the Waitlist
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Be the first to experience ThinqScribe when we launch
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className={`input-field text-sm ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'focus:border-thinq-blue-500 focus:ring-thinq-blue-200'}`}
              placeholder="Enter your first name"
              disabled={loading}
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
              className={`input-field text-sm ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'focus:border-thinq-blue-500 focus:ring-thinq-blue-200'}`}
              placeholder="Enter your last name"
              disabled={loading}
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
              className={`input-field text-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'focus:border-thinq-blue-500 focus:ring-thinq-blue-200'}`}
              placeholder="Enter your email address"
              disabled={loading}
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
              className={`input-field text-sm ${errors.status ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'focus:border-thinq-blue-500 focus:ring-thinq-blue-200'}`}
              disabled={loading}
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
            disabled={loading}
            className={`w-full btn-primary text-sm sm:text-base py-3 mt-2 transform transition-all duration-200 ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:-translate-y-1'}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                <span className="text-sm">Processing...</span>
              </div>
            ) : (
              'Secure Your Spot'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WaitlistForm;