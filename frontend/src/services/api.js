import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
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
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (error.response?.status === 404) {
      console.error('Endpoint not found');
    } else if (error.response?.status >= 500) {
      console.error('Server error');
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
      throw error.response?.data || error;
    }
  },

  // Get all waitlist entries
  getEntries: async (params = {}) => {
    try {
      const response = await api.get('/waitlist', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get single entry by ID
  getEntry: async (id) => {
    try {
      const response = await api.get(`/waitlist/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update entry
  updateEntry: async (id, entryData) => {
    try {
      const response = await api.put(`/waitlist/${id}`, entryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete entry
  deleteEntry: async (id) => {
    try {
      const response = await api.delete(`/waitlist/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get statistics
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