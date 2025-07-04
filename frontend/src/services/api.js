import axios from 'axios';

// Use environment variable for API URL with production fallback
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://thinqscribewaitlist.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
      console.log('Full URL:', `${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Response received:', response.status, response.data);
    }
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (process.env.NODE_ENV === 'development') {
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL
        }
      });
      
      if (error.response?.status === 404) {
        console.error('Endpoint not found - check if backend is running');
      } else if (error.response?.status >= 500) {
        console.error('Server error - check backend logs');
      } else if (error.code === 'ECONNREFUSED') {
        console.error('Connection refused - backend server not running');
      } else if (error.code === 'NETWORK_ERROR') {
        console.error('Network error - check internet connection');
      }
    }
    
    return Promise.reject(error);
  }
);

// Waitlist API functions
export const waitlistAPI = {
  // Add new entry to waitlist
  addEntry: async (entryData) => {
    try {
      const response = await api.post('/waitlist', entryData);
      return response.data;
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      if (error.response?.data) {
        throw error.response.data;
      } else if (error.message) {
        throw { message: error.message };
      } else {
        throw { message: 'Unknown error occurred' };
      }
    }
  },

  // Get all waitlist entries (removed for production)
  getEntries: async (params = {}) => {
    try {
      const response = await api.get('/waitlist', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get single entry by ID (removed for production)
  getEntry: async (id) => {
    try {
      const response = await api.get(`/waitlist/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update entry (removed for production)
  updateEntry: async (id, entryData) => {
    try {
      const response = await api.put(`/waitlist/${id}`, entryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete entry (removed for production)
  deleteEntry: async (id) => {
    try {
      const response = await api.delete(`/waitlist/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get statistics (removed for production)
  getStats: async () => {
    try {
      const response = await api.get('/waitlist/stats/overview');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default api; 